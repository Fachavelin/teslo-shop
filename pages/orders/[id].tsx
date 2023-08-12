import NextLink from 'next/link';
import { NextPage } from 'next';
import { ShopLayout } from '@/components/layouts';
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { CartList, OrderSummary } from '@/components/cart';
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material';

const OrdenPage: NextPage = () => {
  return (
    <ShopLayout
      title={`Resumen de orden 123213213`}
      pageDescription={'Resumen de la orden'}
    >
      <Typography variant='h1' component='h1'>
        Resumen de la orden 1212321
      </Typography>

      <Chip
        sx={{ my: 2 }}
        label='Orden ya fue pagada'
        variant='outlined'
        color='success'
        icon={<CreditScoreOutlined />}
      />
      {/* <Chip
        sx={{ my: 2 }}
        label='Pendiente de pago'
        variant='outlined'
        color='error'
        icon={<CreditCardOffOutlined />}
      /> */}

      <Grid container>
        <Grid item xs={12} sm={7}>
          {/* CartList */}
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card' sx={{ padding: 4 }}>
            <Typography variant='h2'>Resumen (3 productos)</Typography>
            <Divider sx={{ my: 1 }} />
            <Box display={'flex'} justifyContent='space-between'>
              <Typography variant='subtitle1'>Direccion de entrega</Typography>
              <NextLink
                href={`/checkout/address`}
                style={{ textDecoration: 'none' }}
              >
                <Link component={'span'} underline='always'>
                  Editar
                </Link>
              </NextLink>
            </Box>
            <Typography>Alexander Chavez</Typography>
            <Typography>323 Av 12 de Febrero</Typography>
            <Typography>San Cristobal, Galapagos</Typography>
            <Typography>Ecuador</Typography>
            <Typography>+593 986097821</Typography>
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
              {/* Todo Pagar */}
              <h1>Pagar</h1>
              <Chip
                sx={{ my: 2 }}
                label='Orden ya fue pagada'
                variant='outlined'
                color='success'
                icon={<CreditScoreOutlined />}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrdenPage;
