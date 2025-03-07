import Link from 'next/link';

import { Title } from '@/components';
import { initialData } from '@/seed/seed';
import Image from 'next/image';


const productsInCart = [
  initialData.products[ 0 ],
  initialData.products[ 1 ],
  initialData.products[ 2 ],
];


export default function Checkout() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">

        <Title title='Order verification' />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Carrito */ }
          <div className="flex flex-col mt-5">
            <span className="text-xl">Adjust items</span>
            <Link href="/cart" className="underline mb-5">
              Cart edition
            </Link>

            {/* Items */ }
            {
              productsInCart.map( product => (
                <div key={ product.slug } className="flex mb-5">
                  <Image
                    src={ `/products/${ product.images[ 0 ] }` }
                    width={ 100 }
                    height={ 100 }
                    style={ {
                      width: '100px',
                      height: '100px'
                    } }
                    alt={ product.title }
                    className="mr-5 rounded"
                  />

                  <div>
                    <p>{ product.title }</p>
                    <p>${ product.price } x 3</p>
                    <p className="font-bold">Subtotal: ${ product.price * 3 }</p>
                  </div>
                </div>

              ) )
            }
          </div>

          {/* Checkout - Order summary */ }
          <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2">Delivery Address</h2>
            <div className="mb-10">
              <p className="text-xl">Simsons Homer</p>
              <p>False Av 123</p>
              <p>Center street</p>
              <p>Springfield</p>
              <p>123.123.123</p>
            </div>

            {/* Divider */ }
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
            <h2 className="text-2xl mb-2">Order summary</h2>
            <div className="grid grid-cols-2">

              <span>No. Products</span>
              <span className="text-right">3 articles</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$ 100</span>

            </div>
            <div className="mt-5 mb-2 w-full">
              <p className="mb-5">
                {/* Disclaimer */ }
                <span className="text-xs">
                  Clicking &ldquo;Order&ldquo; button, you accept <a href="#" className="underline">terms and conditions</a> and <a href="#" className="underline">privacy terms</a>
                </span>
              </p>
              <Link
                className="flex btn-primary justify-center"
                href="/orders/123">
                Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}