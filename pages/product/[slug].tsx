import { ShopLayout } from '@/components/layouts';
import { ProductSlideShow, SizeSelector } from '@/components/products';
import { FullScreenLoading, ItemCounter } from '@/components/ui';
import { useProducts } from '@/hooks';
import { ICartProduct, IProduct, ISize } from '@/interfaces';
import { Grid, Typography, Button, Chip } from '@mui/material';
import { Box } from '@mui/system';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { dbProducts } from '@/database';
import { redirect } from 'next/dist/server/api-utils';

import { GetStaticPaths } from 'next';
import { GetStaticProps } from 'next';
import { useContext, useState } from 'react';
import { CartContext } from '@/context';

interface Props {
  product: IProduct;
}
const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const { addProductToCart } = useContext(CartContext);

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    inStock: product.inStock,
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const onSelectedSize = (size: ISize) => {
    setTempCartProduct((curretProduct) => ({
      ...curretProduct,
      size,
    }));
  };

  const onUpdateQuantity = (newQuantity: number) => {
    setTempCartProduct((curretProduct) => ({
      ...curretProduct,
      quantity: newQuantity,
    }));
  };

  const onAddProduct = () => {
    if (!tempCartProduct.size) {
      return;
    }

    //TODO:Dispatch de la accion del context para agregar al carrito
    addProductToCart(tempCartProduct);
    // router.push('/cart');
  };

  return (
    <ShopLayout
      title={`${product.title}`}
      pageDescription={`${product.description}`}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display={'flex'} flexDirection='column'>
            <Typography variant='h1' component='h1'>
              {product.title}
            </Typography>
            <Typography variant='subtitle1' component='h2'>
              ${product.price}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updateQuantity={onUpdateQuantity}
                maxValue={product.inStock > 5 ? 5 : product.inStock}
              />
              <SizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onSelectedSize={onSelectedSize}
              />
            </Box>

            {product.inStock > 0 ? (
              <Button
                color='secondary'
                className='circular-btn'
                onClick={() => onAddProduct()}
              >
                {tempCartProduct.size
                  ? 'Agregar al carrito'
                  : 'Seleccione una talla'}
              </Button>
            ) : (
              <Chip
                label='No hay disponibles'
                color='error'
                variant='outlined'
              />
            )}

            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Descripcion:</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductsSlugs();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };

  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default ProductPage;

/* const router = useRouter();

const { products: product, isLoading } = useProducts(
  `/products/${router.query.slug}`
);

if (isLoading) {
  return (
    <ShopLayout title={''} pageDescription={''}>
      <FullScreenLoading />
    </ShopLayout>
  );
} */
