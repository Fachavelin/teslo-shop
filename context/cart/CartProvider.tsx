import { FC, ReactNode, useEffect, useLayoutEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import { ICartProduct, IOrder, IProduct, ShippingAddress } from '@/interfaces';
import { CartContext, cartReducer } from './';
import { tesloApi } from '@/api';

interface Props {
  children: ReactNode;
}

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  shippingAddress?: ShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,

  shippingAddress: undefined,
};

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  //Efecto

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];

      dispatch({
        type: 'Cart - LoadCart from cookies | storage',
        payload: cookieProducts,
      });
    } catch (error) {
      dispatch({
        type: 'Cart - LoadCart from cookies | storage',
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    if (Cookie.get('firstName')) {
      const shippingAddress = {
        firstName: Cookie.get('firstName') || '',
        lastName: Cookie.get('lastName') || '',
        address: Cookie.get('address') || '',
        address2: Cookie.get('address2') || '',
        zip: Cookie.get('zip') || '',
        city: Cookie.get('city') || '',
        country: Cookie.get('country') || '',
        phone: Cookie.get('phone') || '',
      };

      dispatch({ type: 'Cart - LoadAddress from Cookies', payload: shippingAddress });
    }
  }, []);

  useEffect(() => {
    const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);

    const subTotal = state.cart.reduce((prev, current) => current.price * current.quantity + prev, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    };

    dispatch({ type: 'Cart - Update order summary', payload: orderSummary });
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    //!Nivel 3
    const productsInCart = state.cart.some((p) => p._id === product._id);
    if (!productsInCart)
      return dispatch({
        type: 'Cart - Update Products in Cart',
        payload: [...state.cart, product],
      });

    const productInCartButDiffenrentSize = state.cart.some((p) => p._id === product._id && p.size === product.size);
    if (!productInCartButDiffenrentSize)
      return dispatch({
        type: 'Cart - Update Products in Cart',
        payload: [...state.cart, product],
      });

    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      p.quantity += product.quantity;
      return p;
    });
    // Cookie.set('cart', JSON.stringify(state.cart));

    dispatch({
      type: 'Cart - Update Products in Cart',
      payload: updatedProducts,
    });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: 'Cart - Change cart Quantity', payload: product });
  };

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: 'Cart - Remove product in cart', payload: product });
  };

  const updateAddress = (address: ShippingAddress) => {
    Cookie.set('firstName', address.firstName);
    Cookie.set('lastName', address.lastName);
    Cookie.set('address', address.address);
    Cookie.set('address2', address.address2 || '');
    Cookie.set('zip', address.zip);
    Cookie.set('city', address.city);
    Cookie.set('country', address.country);
    Cookie.set('phone', address.phone);

    dispatch({ type: 'Cart - UpdateAddres from Cookies', payload: address });
  };

  const createOrder = async () => {
    if (!state.shippingAddress) {
      throw new Error('No hay direccion de entrega');
    }

    const body: IOrder = {
      orderItems: state.cart.map((p) => ({
        ...p,
        size: p.size!,
      })),
      shippingAdress: state.shippingAddress,
      numberOfItems: state.numberOfItems,
      subTotal: state.subTotal,
      tax: state.tax,
      total: state.total,
      isPaid: false,
    };

    try {
      const { data } = await tesloApi.post('/orders', body);

      console.log({ data });
    } catch (error) {}
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
        updateAddress,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

//!Nivel 1
// dispatch({ type: 'Cart - Add Product', payload: product });
//!Nivel 2
// const productsInCart = state.cart.filter(
//   (p) => p._id !== product._id && p.size !== product.size
// );
// dispatch({
//   type: 'Cart - Add Product',
//   payload: [...productsInCart.product],
// });
