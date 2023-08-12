import { NextPage } from 'next';
import { useContext, useEffect } from 'react';
import { ShopLayout } from '@/components/layouts';
import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material';
import { CartList, OrderSummary } from '@/components/cart';
import { CartContext } from '@/context';
import { useRouter } from 'next/router';

const CartPage: NextPage = () => {
  const { isLoaded, cart } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace('/cart/empty');
    }
  }, [isLoaded, cart, router]);

  if (!isLoaded || cart.length === 0) {
    return <></>;
  }

  const onCheckout = () => {
    router.push('/checkout/adress');
  };

  return (
    <ShopLayout title={`Carrito - 3`} pageDescription={'Carrito de compras de la tienda'}>
      <Typography variant='h1' component='h1'>
        Carrito
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          {/* CartList */}
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card' sx={{ padding: 4 }}>
            <Typography variant='h2'>Orden</Typography>
            <Divider sx={{ my: 1 }} />
            <OrderSummary />
            <Box sx={{ mt: 3 }}>
              <Button onClick={onCheckout} color='secondary' className='circular-btn' fullWidth>
                Checkout
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
