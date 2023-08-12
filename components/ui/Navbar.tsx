import { CartContext, UIContext } from '@/context';
import { useContext, useState } from 'react';
import NextLink from 'next/link';
import {
  AppBar,
  Toolbar,
  Link,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
  Input,
  InputAdornment,
} from '@mui/material';
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCart,
} from '@mui/icons-material';
import router, { useRouter } from 'next/router';

export const Navbar = () => {
  const { asPath, push } = useRouter();
  const { toggleSideMenu } = useContext(UIContext);
  const { numberOfItems = 0 } = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return 0;

    navigateTo(`/search/${searchTerm}`);
  };

  const navigateTo = (url: string) => {
    push(url);
  };

  return (
    <AppBar>
      <Toolbar>
        <NextLink href={'/'} style={{ textDecoration: 'none' }}>
          <Link component={'span'} display='flex' alignItems={'center'}>
            <Typography variant='h6'>Teslo |</Typography>
            <Typography>Shop</Typography>
          </Link>
        </NextLink>

        {/* Todo Flex */}
        <Box flex={'1'} />

        <Box
          className='fadeIn'
          sx={{
            display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' },
          }}
        >
          <NextLink href={`/category/men`} style={{ textDecoration: 'none' }}>
            <Link component={'span'}>
              <Button color={asPath === '/category/men' ? 'primary' : 'info'}>
                Hombres
              </Button>
            </Link>
          </NextLink>
          <NextLink href={`/category/women`} style={{ textDecoration: 'none' }}>
            <Link component={'span'}>
              <Button color={asPath === '/category/women' ? 'primary' : 'info'}>
                Mujeres
              </Button>
            </Link>
          </NextLink>
          <NextLink href={`/category/kid`} style={{ textDecoration: 'none' }}>
            <Link component={'span'}>
              <Button color={asPath === '/category/kid' ? 'primary' : 'info'}>
                Niños
              </Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={'1'} />

        {/* Pantallas grandes */}
        {isSearchVisible ? (
          <Input
            sx={{ display: { xs: 'none', sm: 'flex' } }}
            className='fadeIn'
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearchTerm()}
            type='text'
            placeholder='Buscar...'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            sx={{ display: { xs: 'none', sm: 'flex' } }}
            onClick={() => setIsSearchVisible(true)}
          >
            <SearchOutlined />
          </IconButton>
        )}

        {/* Pantallas pequenas  */}
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>
        <NextLink href={'/cart'}>
          <Link component={'span'}>
            <IconButton>
              <Badge
                badgeContent={numberOfItems < 10 ? numberOfItems : '+9'}
                color='secondary'
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <Button
          onClick={() => {
            toggleSideMenu();
          }}
        >
          Menu
        </Button>
      </Toolbar>
    </AppBar>
  );
};
