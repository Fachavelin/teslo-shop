import { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import { CartContext } from '@/context';
import { currency } from '@/utils';

export const OrderSummary = () => {
  const { numberOfItems, subTotal, total, tax } = useContext(CartContext);

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{numberOfItems}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{`${currency.format(subTotal)}`}</Typography>
      </Grid>
      <Grid item xs={6} display='flex'>
        <Typography>
          Impuestos{`(${Number(process.env.NEXT_PUBLIC_TAX_RATE)})`}{' '}
        </Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{`${currency.format(tax)}`}</Typography>
      </Grid>
      <Grid item xs={6} display='flex' marginTop={2}>
        <Typography variant='subtitle1'>Total</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end' marginTop={2}>
        <Typography variant='subtitle1'>{`${currency.format(
          total
        )}`}</Typography>
      </Grid>
    </Grid>
  );
};
