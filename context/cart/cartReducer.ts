import { ICartProduct } from '@/interfaces';
import { CartState, ShippingAdress } from '.';

type CartActionType =
  | {
      type: 'Cart - LoadCart from cookies | storage';
      payload: ICartProduct[];
    }
  | {
      type: 'Cart - Update Products in Cart';
      payload: ICartProduct[];
    }
  | {
      type: 'Cart - Change cart Quantity';
      payload: ICartProduct;
    }
  | {
      type: 'Cart - Remove product in cart';
      payload: ICartProduct;
    }
  | {
      type: 'Cart - Update order summary';
      payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
      };
    }
  | {
      type: 'Cart - LoadAddress from Cookies';
      payload: ShippingAdress;
    }
  | {
      type: 'Cart - UpdateAddres from Cookies';
      payload: ShippingAdress;
    };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case 'Cart - LoadCart from cookies | storage':
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      };
    case 'Cart - Update Products in Cart':
      return {
        ...state,
        cart: [...action.payload],
      };

    case 'Cart - Change cart Quantity':
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;

          return action.payload;
        }),
      };
    case 'Cart - Remove product in cart':
      return {
        ...state,
        cart: state.cart.filter(
          (product) => !(product._id === action.payload._id && product.size === action.payload.size)
        ),
        /* cart: state.cart.filter((product) => {
          if (
            product._id === action.payload._id &&
            product.size === action.payload.size
          ) {
            return false;
          }
          return true;
        }), */
      };
    case 'Cart - Update order summary':
      return {
        ...state,
        ...action.payload,
      };

    case 'Cart - LoadAddress from Cookies':
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case 'Cart - UpdateAddres from Cookies':
    case 'Cart - LoadAddress from Cookies':
      return {
        ...state,
        shippingAddress: action.payload,
      };

    default:
      return state;
  }
};
