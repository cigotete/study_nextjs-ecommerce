export const revalidate = 60;  // Revalidation when the page is visited again after 60 seconds.

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';

import { Gender } from '@prisma/client';
import { redirect } from 'next/navigation';



interface Props {
  params: Promise<{
    gender: string;
  }>,
  searchParams: Promise<{
    page?: string; 
  }>
}


export default async function GenderByPage({ params, searchParams }: Props) {

  const { gender } = await params;
  const searchParameters = await searchParams;

  const page = searchParameters.page ? parseInt( searchParameters.page ) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ 
    page, 
    gender: gender as Gender,
  });


  if ( products.length === 0 ) {
    redirect(`/gender/${ gender }`);
  }
  
  const labels: Record<string, string>  = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos'
  }

  return (
    <>
      <Title
        title={`Artículos de ${ labels[gender] }`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid 
        products={ products }
      />

      <Pagination totalPages={ totalPages }  />
      
    </>
  );
}