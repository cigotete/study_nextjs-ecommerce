import { getCategories, getProductBySlug } from '@/actions';
import { Title } from '@/components';
import { redirect } from 'next/navigation';
import { ProductForm } from './ui/ProductForm';

type Props = {
  params: Promise<{
    slug: string;
  }>
}

export default async function ProductPage({ params }: Props) {

  const { slug } = await params;

  const [ product, categories ] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ]);


  if ( !product && slug !== 'new' ) {
    redirect('/admin/products')
  }

  const title = (slug === 'new') ? 'New product' : 'Edit product'

  return (
    <>
      <Title title={ title } />

      <ProductForm product={ product ?? {} } categories={ categories } />
    </>
  );
}
