import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Demo catalog so a fresh database is not empty. Images are placeholder photos.
const demoProducts = [
  { productName: 'Classic White Sneakers', productPrice: 79, productCategory: 'men', productColors: ['white', 'black'], productSizes: ['40', '41', '42', '43', '44'] },
  { productName: 'Denim Jacket', productPrice: 95, productCategory: 'men', productColors: ['blue'], productSizes: ['S', 'M', 'L', 'XL'] },
  { productName: 'Cotton Crew T-Shirt', productPrice: 24, productCategory: 'men', productColors: ['black', 'gray', 'white'], productSizes: ['S', 'M', 'L', 'XL'] },
  { productName: 'Slim Fit Chinos', productPrice: 58, productCategory: 'men', productColors: ['beige', 'navy'], productSizes: ['30', '32', '34', '36'] },
  { productName: 'Floral Summer Dress', productPrice: 69, productCategory: 'women', productColors: ['red', 'blue'], productSizes: ['XS', 'S', 'M', 'L'] },
  { productName: 'Leather Handbag', productPrice: 120, productCategory: 'women', productColors: ['brown', 'black'], productSizes: ['One size'] },
  { productName: 'High-Waist Jeans', productPrice: 72, productCategory: 'women', productColors: ['blue', 'black'], productSizes: ['S', 'M', 'L'] },
  { productName: 'Knit Wool Sweater', productPrice: 64, productCategory: 'women', productColors: ['cream', 'green'], productSizes: ['S', 'M', 'L', 'XL'] },
];

async function main() {
  // Admin account comes from env vars. Without them no admin is created.
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    const existing = await prisma.users.findUnique({ where: { email } });
    if (!existing) {
      await prisma.users.create({
        data: {
          email,
          username: 'Admin',
          password: await bcrypt.hash(password, 10),
          role: 'admin',
          permissions: {
            manageUsers: true,
            manageProducts: true,
            manageOrders: true,
            viewAnalytics: true,
            manageAdmins: true,
          },
        },
      });
    }
  }

  if ((await prisma.products.count()) === 0) {
    for (const [i, p] of demoProducts.entries()) {
      await prisma.products.create({
        data: {
          ...p,
          productDescription: `${p.productName}. Demo product for the store.`,
          productUrlImgs: [`https://picsum.photos/seed/shop${i + 1}/600/700`],
          stock: 25,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
