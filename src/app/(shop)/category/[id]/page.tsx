import { ProductGrid, Title } from '@/components';
import type { ValidCategory } from '@/interfaces';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';

const seedProducts = initialData.products;
interface Props {
  params: {
    id: ValidCategory
  }
}

export default async function Category({ params }: Props) {

  const { id } = await params;

  const validCategories: ValidCategory[] = ['men', 'women', 'kid', 'unisex'];
  if (!validCategories.includes(id)) { // Validation on execution time.
    return notFound();
  }
  const products = seedProducts.filter( product => product.gender === id );

  const labels: Record<ValidCategory, string>  = {
    'men': 'for men',
    'women': 'for women',
    'kid': 'for kids',
    'unisex': 'for everyone',
  }

  return (
    <>
      <Title
        title={`Items for ${ labels[id] }`}
        subtitle="All products"
        className="mb-2"
      />

      <ProductGrid 
        products={ products }
      />
      
    </>
  );
}