export const revalidate = 60; // Revalidation when the page is visited again after 60 seconds.

import { redirect } from 'next/navigation';
import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';

interface Props {
  searchParams: Promise<{
    page?: string;
  }>
}

export default async function Home({ searchParams }: Props) {

  const searchParameters = await searchParams;
  const page = searchParameters.page ? parseInt( searchParameters.page ) : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({ page });

  if ( products.length === 0 ) {
    redirect('/');
  }

  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid
        products={ products }
      />

      <Pagination totalPages={ totalPages } />
      
    </>
  );
}
