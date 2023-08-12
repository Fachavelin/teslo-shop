import { NextPage } from 'next';
import { ShopLayout } from '@/components/layouts';
import { Typography } from '@mui/material';
import { useProducts } from '@/hooks';
import { FullScreenLoading } from '@/components/ui';
import { ProductList } from '@/components/products';

export const WomenPage: NextPage = () => {
  const { products, isLoading, isError } = useProducts(
    '/products?gender=women'
  );

  return (
    <ShopLayout
      title={`Teslo-Shop - WOMEN`}
      pageDescription={'Encuentra los mejores productos de Tesla aqui de Mujer'}
    >
      <Typography variant='h1' component={'h1'}>
        Tienda
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }} component={'h1'}>
        Productos hombres
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default WomenPage;
