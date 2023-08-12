import { ReactNode, FC } from 'react';
import Head from 'next/head';
import { Navbar, SideMenu } from '../ui';

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children: ReactNode;
}
export const ShopLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name='description' />
        <meta name='og:title' content={title} />
        <meta name='og:description' content={pageDescription} />

        {imageFullUrl && <meta name='og:image' content={imageFullUrl} />}
      </Head>

      <Navbar />

      {/*TODO: Sidebar  */}
      <SideMenu />

      <main
        style={{ margin: '80px auto', maxWidth: '1440px', padding: '0px 30px' }}
      >
        {children}
      </main>

      <footer>{/* TODO: Footer */}</footer>
    </>
  );
};

export default ShopLayout;
