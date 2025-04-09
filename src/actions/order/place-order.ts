"use server";
import prisma from "@/lib/prisma";

import { auth } from "@/auth.config";
import type { Address, ValidSize } from "@/interfaces";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: ValidSize;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  // Verify user session
  if (!userId) {
    return {
      ok: false,
      message: "No user session",
    };
  }

  // Get product information
  // Note: remember that we can have 2+ products with the same ID
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // Calculate amounts // Header
  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  // The totals for tax, subtotal, and total
  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId} product does not exist - Error 500`);

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  // Create database transaction
  try {

    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Update product stock
      const updatedProductsPromises = products.map((product) => {
        //  Accumulate values
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} product has no defined quantity`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            // inStock: product.inStock - productQuantity // don't do this
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // Check for negative values in stock = no stock available
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} product does not have enough inventory`);
        }
      });

      // 2. Create order - Header - Details
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // Validate, if price is zero, then throw an error.

      // 3. Create order address
      // Address
      const orderAddress = await tx.orderAddress.create({
        data: {
          firstName: address.firstName,
          lastName: address.lastName,
          address: address.address,
          address2: address.address2 || "",
          postalCode: address.postalCode,
          city: address.city,
          phone: address.phone,
          countryId: address.country,
          orderId: order.id,
        },
      });

      return {
        updatedProducts: updatedProducts,
        order: order,
        orderAddress: orderAddress,
      };
    });


    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
