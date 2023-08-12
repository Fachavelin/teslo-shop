import { FC, useContext } from 'react';
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { initialData } from '@/database/products';
import { ItemCounter } from '../ui';
import { CartContext } from '@/context';
import { ICartProduct } from '@/interfaces';

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const { cart, updateCartQuantity, removeCartProduct } =
    useContext(CartContext);

  const onNewCartQuantityValue = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  const onRemoveCartProduct = (product: ICartProduct) => {
    removeCartProduct(product);
  };

  return (
    <>
      {cart.map((product) => (
        <Grid
          container
          spacing={2}
          marginBottom={1}
          key={product.slug + product.size}
        >
          <Grid item xs={3}>
            <NextLink
              href={`/product/${product.slug}`}
              style={{ textDecoration: 'none' }}
            >
              {/* LLevar a la pagina */}
              <Link component='span'>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
                    component='img'
                    sx={{ borderRadius: '5px' }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body1'>{product.title}</Typography>
              <Typography variant='body1'>
                Talla: <strong>{product.size}</strong>
              </Typography>
              {/* Condicional */}
              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={product.inStock}
                  updateQuantity={(value) => {
                    onNewCartQuantityValue(product, value);
                  }}
                />
              ) : (
                <Typography variant='h5'>
                  {product.quantity}{' '}
                  {product.quantity > 1 ? 'productos' : 'producto'}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={2} display='flex' flexDirection='column'>
            <Typography variant='subtitle1'>${product.price}</Typography>
            {editable && (
              <Button
                variant='text'
                color='secondary'
                onClick={() => removeCartProduct(product)}
              >
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
