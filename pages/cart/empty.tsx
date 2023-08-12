import { ShopLayout } from '@/components/layouts';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { NextPage } from 'next';
import NextLink from 'next/link';

const EmptyPage: NextPage = () => {
  return (
    <ShopLayout
      title={'Carrito de compras vacio'}
      pageDescription={'No hay articulos en el carrito de compras'}
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        height={'calc(100vh - 200px)'}
        sx={{ flexDirection: { xs: 'column', md: 'row' } }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Typography>Su carrito esta vacio</Typography>
          <NextLink href={`/`} style={{ textDecoration: 'none' }}>
            <Link component='span' typography={'h4'} color='secondary'>
              Regresar
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
