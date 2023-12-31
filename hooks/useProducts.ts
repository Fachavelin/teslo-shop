import useSWR, { SWRConfiguration } from 'swr';
import { IProduct } from '@/interfaces';

const fetcher = (...args: [key: string]) =>
  fetch(...args).then((res) => res.json());

export const useProducts = (url: string, config?: SWRConfiguration) => {
  //   const { data, error } = useSWR<IProduct[]>(`/api${url}`, fetcher, {});
  const { data, error } = useSWR<IProduct>(`/api${url}`, fetcher, {});

  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};

/* if (error) return <div>failed to load</div>;
if (isLoading) return <div>loading...</div>; */
