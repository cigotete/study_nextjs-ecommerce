export const revalidate = 86400;

import { notFound } from 'next/navigation';
import { titleFont } from '@/config/fonts';
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from '@/components';
import { getProductBySlug } from "@/actions";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Product( { params }: Props ) {

  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if ( !product ) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      {/* Slideshow */ }
      <div className="col-span-1 md:col-span-2 ">

        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          title={ product.title }
          images={ product.images }
          className="block md:hidden"
        />

        {/* Desktop Slideshow */}
        <ProductSlideshow
          title={ product.title }
          images={ product.images }
          className="hidden md:block"
        />

      </div>

      {/* Details */ }
      <div className="col-span-1 px-5">

        <StockLabel slug={product.slug} />

        <h1 className={ ` ${ titleFont.className } antialiased font-bold text-xl` }>
          { product.title }
        </h1>
        <p className="text-lg mb-5">${ product.price }</p>

        {/* Size selector */ }
        <SizeSelector
          selectedSize={ product.sizes[ 1 ] }
          availableSizes={ product.sizes }
        />

        {/* Qty selector */ }
        <QuantitySelector
          quantity={ 2 }
        />

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