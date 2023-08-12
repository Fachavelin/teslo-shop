import { NextPage } from 'next';
import { ShopLayout } from '@/components/layouts';
import { Typography } from '@mui/material';
import { useProducts } from '@/hooks';
import { FullScreenLoading } from '@/components/ui';
import { ProductList } from '@/components/products';

export const MenPage: NextPage = () => {
  const { products, isLoading, isError } = useProducts('/products?gender=men');

  return (
    <ShopLayout
      title={`Teslo-Shop - MEN`}
      pageDescription={
        'Encuentra los mejores productos de Tesla aqui de hombre'
      }
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

export default MenPage;
