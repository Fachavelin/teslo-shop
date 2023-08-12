import type { NextPage } from 'next';
import { ShopLayout } from '@/components/layouts';
import { Typography } from '@mui/material';
import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks';
import { FullScreenLoading } from '@/components/ui';
import { GetServerSideProps } from 'next';
import { dbProducts } from '@/database';
import { IProduct } from '@/interfaces';
import { getAllProducts } from '@/database/dbProducts';

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, query, foundProducts }) => {
  // const { products, isLoading, isError } = useProducts('/products');

  return (
    <ShopLayout
      title={`Teslo-Shop - HOME`}
      pageDescription={'Encuentra los mejores productos de Tesla aqui'}
    >
      <Typography variant='h1' component={'h1'}>
        Buscar Producto
      </Typography>
      {foundProducts ? (
        <Typography
          variant='h2'
          sx={{ mb: 1 }}
          component={'h1'}
          textTransform='capitalize'
        >
          Resultados de busqueda:{` ${query}`}
        </Typography>
      ) : (
        <>
          <Typography variant='h2' sx={{ mb: 1 }} component={'h1'}>
            No encontramos ningun producto con:{` ${query}`}
          </Typography>
        </>
      )}
      <ProductList products={products} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  //TODO: Retornar otros Productos

  if (!foundProducts) {
    products = await getAllProducts();
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default SearchPage;
