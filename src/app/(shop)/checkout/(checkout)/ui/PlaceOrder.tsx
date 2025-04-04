"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { useShallow } from 'zustand/react/shallow';
import { placeOrder } from '@/actions';
import { useAddressStore, useCartStore } from "@/state";
import { currencyFormat } from '@/utils';

export const PlaceOrder = () => {

  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false); // Blocking button

  const address = useAddressStore((state) => state.address);

  const { itemsInCart, subTotal, tax, total } = useCartStore(useShallow((state) =>
    state.getSummaryInformation())
  );
  const cart = useCartStore( state => state.cart );
  const clearCart = useCartStore( state => state.clearCart );

  useEffect(() => {
    setLoaded(true);
  }, []);


  const onPlaceOrder = async() => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map( product => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }))

    //Server Action
    const resp = await placeOrder( productsToOrder, address);
    if ( !resp.ok ) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }

    //* Good to GO
    clearCart();
    router.replace('/orders/' + resp.order?.id );

  }

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2">Delivery address</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Order resume</h2>

      <div className="grid grid-cols-2">
        <span>No. Products</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Taxes (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(total)}
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            Clicking over &quot;Confirm Order&quot;, you agree to our {" "}
            <a href="#" className="underline">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy policy.
            </a>
          </span>
        </p>

        <p className="text-red-500">{ errorMessage }</p>

        <button
          onClick={ onPlaceOrder }
          className={
            clsx({
              'btn-primary': !isPlacingOrder,
              'btn-disabled': isPlacingOrder
            })
          }
        >
          Confirm order
        </button>
      </div>
    </div>
  );
};