import { ShopLayout } from '@/components/layouts';
import { AuthContext, CartContext } from '@/context';
import { countries } from '@/utils/coutries';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
}

const getAddressFromCookies = (): FormData => {
  return {
    firstName: Cookies.get('firstName') || '',
    lastName: Cookies.get('lastName') || '',
    address: Cookies.get('address') || '',
    address2: Cookies.get('address2') || '',
    zip: Cookies.get('zip') || '',
    city: Cookies.get('city') || '',
    country: Cookies.get('country') || '',
    phone: Cookies.get('phone') || '',
  };
};

const AdressPage: NextPage = () => {
  const router = useRouter();
  const { updateAddress } = useContext(CartContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
      zip: '',
      city: '',
      country: '',
      phone: '',
    },
  });

  useEffect(() => {
    reset(getAddressFromCookies());
  }, [reset]);

  const onSubmitAdress = (data: FormData) => {
    console.log(data);

    Cookies.set('firstName', data.firstName);
    Cookies.set('lastName', data.lastName);
    Cookies.set('address', data.address);
    Cookies.set('address2', data.address2 || '');
    Cookies.set('zip', data.zip);
    Cookies.set('city', data.city);
    Cookies.set('country', data.country);
    Cookies.set('phone', data.phone);
    updateAddress(data);

    router.push('/checkout/summary');
  };

  return (
    <ShopLayout title={'Direccion'} pageDescription={'Confirmar direccion del destino'}>
      <Typography variant='h1' component='h1'>
        Direccion
      </Typography>
      <form onSubmit={handleSubmit(onSubmitAdress)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Nombre'
              variant='filled'
              fullWidth
              {...register('firstName', { required: 'El campo firstName es requerido' })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Apellido'
              variant='filled'
              fullWidth
              {...register('lastName', { required: 'El campo lastName es requerido' })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Direccion 1'
              variant='filled'
              fullWidth
              {...register('address', { required: 'El campo address es requerido' })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Direccion 2'
              variant='filled'
              fullWidth
              {...register('address2')}
              /* error={!!errors.address2}
            helperText={errors.address2?.message} */
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Codigo Postal'
              variant='filled'
              fullWidth
              {...register('zip', { required: 'El campo zip es requerido' })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Ciudad'
              variant='filled'
              fullWidth
              {...register('city', { required: 'El campo city es requerido' })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField select variant='filled' label='Pais' defaultValue={countries[0].code}>
                {countries.map((country) => (
                  <MenuItem
                    value={country.code}
                    key={country.code}
                    {...register('country', { required: 'El campo country es requerido' })}
                  >
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('phone', { required: 'El campo phone es requerido' })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              label='Telefono'
              variant='filled'
              fullWidth
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
          <Button type='submit' color='secondary' className='circular-btn' size='large'>
            Revisar Pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

export default AdressPage;

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { token = '' } = req.cookies;
//   let userId = '';
//   let isValidToken = false;

//   try {
//     await jwt.isValidToken(token);
//     isValidToken = true;
//   } catch (error) {
//     isValidToken = false;
//   }

//   if (!isValidToken) {
//     return {
//       redirect: {
//         destination: '/auth/login?p=/checkout/address',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };
