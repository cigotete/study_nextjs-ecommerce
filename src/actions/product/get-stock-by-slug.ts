'use server';

import prisma from '@/lib/prisma';

export const getStockBySlug = async( slug: string ): Promise<number> => {

  try {

    const stock = await prisma.product.findFirst({
      where: { slug },
      select: { inStock: true }
    });
    return stock?.inStock ?? 0;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return 0;
  }


}