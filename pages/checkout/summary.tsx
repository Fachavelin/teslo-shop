import { NextPage } from 'next';
import NextLink from 'next/link';
import { useContext, useEffect } from 'react';
import { ShopLayout } from '@/components/layouts';
import { Box, Button, Card, Divider, Grid, Link, Typography } from '@mui/material';
import { CartList, OrderSummary } from '@/components/cart';
import { CartContext } from '@/context';
import { countries } from '@/utils/coutries';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export const SummaryPage: NextPage = () => {
  const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get('firstName')) {
      router.push('/checkout/address');
    }
  }, [router]);

  if (!shippingAddress) {
    return <></>;
  }
  const {
    firstName = '',
    lastName = '',
    address = '',
    address2 = '',
    city = '',
    zip = '',
    phone = '',
    country = '',
  } = shippingAddress;

  const onCreateOrder = () => {
    createOrder();
  };

  return (
    <ShopLayout title={`Resumen de orden`} pageDescription={'Resumen de la orden'}>
      <Typography variant='h1' component='h1'>
        Resumen de la orden
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          {/* CartList */}
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card' sx={{ padding: 4 }}>
            <Typography variant='h2'>
              Resumen ( {numberOfItems} {numberOfItems === 1 ? 'producto' : 'productos'} )
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box display={'flex'} justifyContent='space-between'>
              <Typography variant='subtitle1'>Direccion de entrega</Typography>
              <NextLink href={`/checkout/address`} style={{ textDecoration: 'none' }}>
                <Link component={'span'} underline='always'>
                  Editar
                </Link>
              </NextLink>
            </Box>
            <Typography>{`${firstName} ${lastName}`}</Typography>
            <Typography>
              {`${address}`}
              {!address2 ? '' : `, ${address2}`}
            </Typography>
            <Typography>{`${city}, ${zip}`}</Typography>
            <Typography> {countries.find((c) => c.code === country)?.name} </Typography>
            <Typography>+{phone}</Typography>
            <Divider sx={{ my: 1 }} />

            <Box display={'flex'} justifyContent='end'>
              <NextLink href={`/cart`} style={{ textDecoration: 'none' }}>
                <Link component={'span'} underline='always'>
                  Editar
                </Link>
              </NextLink>
            </Box>
            <OrderSummary />

            <Box sx={{ mt: 3 }}>
              <Button color='secondary' className='circular-btn' fullWidth onClick={onCreateOrder}>
                Confirmar orden
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
