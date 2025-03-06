import { notFound } from 'next/navigation';
import { initialData } from '@/seed/seed';
import { ProductGrid, Title } from '@/components';

interface Props {
  params: {
    id: string;
  }
}

const products = initialData.products;

export default async function Category({ params }: Props) {

  const { id } = await params;
  const validCategories = ['women', 'men', 'kid'];
  if (!validCategories.includes(id)) {
    notFound();
  }

  const filteredProducts = products.filter(
    product => product.gender === id
  );

  const title=`${ id.toUpperCase() }`;

  return (
    <div>
      <Title
        title= { title }
        subtitle="Productos de la categoría"
        className="m-3"
      />

      <ProductGrid
        products={ filteredProducts }
      />
    </div>
  );
}