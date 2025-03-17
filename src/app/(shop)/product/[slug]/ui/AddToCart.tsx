"use client";

import { useState } from "react";

import { QuantitySelector, SizeSelector } from "@/components";
import type { CartProduct, Product, ValidSize } from "@/interfaces";
import { useCartStore } from '@/state';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {

  const addProductToCart = useCartStore( state => state.addProductTocart );

  const [size, setSize] = useState<ValidSize | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);

    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0]
    }

    addProductToCart(cartProduct);

    setPosted(false);
    setQuantity(1);
    setSize(undefined);

  };

  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-500 fade-in">
          Please select a size*
        </span>
      )}

      {/* Size selector */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={(size) => setSize(size)}
      />

      {/* Qty selector */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      {/* Button */}
      <button onClick={addToCart} className="btn-primary my-5">
        Add to cart
      </button>
    </>
  );
};