import Link from 'next/link';
import { Title } from '@/components';
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from './ui/PlaceOrder';

export default function Checkout() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verify order" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Adjust items</span>
            <Link href="/cart" className="underline mb-5">
              Edit Cart
            </Link>

            {/* Items */}
            <ProductsInCart />
          </div>

          {/* Checkout - Order resume */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}