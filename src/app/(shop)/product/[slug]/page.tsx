import { notFound } from 'next/navigation';

import { initialData } from '@/seed/seed';
import { titleFont } from '@/config/fonts';

interface Props {
  params: {
    slug: string;
  };
}

export default async function Product( { params }: Props ) {

  const { slug } = await params;
  const product = initialData.products.find( product => product.slug === slug );

  if ( !product ) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      {/* Slideshow */ }
      <div className="col-span-1 md:col-span-2 ">

        {/* Mobile Slideshow */}

        {/* Desktop Slideshow */}

      </div>

      {/* Details */ }
      <div className="col-span-1 px-5">

        <h1 className={ ` ${ titleFont.className } antialiased font-bold text-xl` }>
          { product.title }
        </h1>
        <p className="text-lg mb-5">${ product.price }</p>

        {/* Size selector */ }


        {/* Qty selector */ }


        {/* Button */ }
        <button className="btn-primary my-5">
          Agregar al carrito
        </button>

        {/* Description */ }
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">
          { product.description }
        </p>

      </div>

    </div>
  );
}