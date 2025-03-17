import { initialData } from './seed';
import prisma from '../lib/prisma';

async function main() {

  // 1. Delete any record.
  await Promise.all([
    await prisma.user.deleteMany(),
    await prisma.productImage.deleteMany(),
    await prisma.product.deleteMany(),
    await prisma.category.deleteMany()
  ]);
  
  const { categories, products, users } = initialData;

  await prisma.user.createMany({
    data: users
  });

  //  2. Inserting Categories
  const categoriesData = categories.map( category => ({
    name: category
  }));
  
  await prisma.category.createMany({
    data: categoriesData
  });

  const categoriesDB = await prisma.category.findMany();
  
  const categoriesMap = categoriesDB.reduce( (map, category) => {
    map[ category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  // 3. Inserting Products

  products.forEach( async(product) => {

    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type]
      }
    })

    // Images
    const imagesData = images.map( image => ({
      url: image,
      productId: dbProduct.id
    }));

    await prisma.productImage.createMany({
      data: imagesData
    });

  });

  console.log( 'Seed records created successfully' );
}

( () => {

  if ( process.env.NODE_ENV === 'production' ) return;

  main();
} )();