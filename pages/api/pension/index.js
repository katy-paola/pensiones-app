import prisma from '../../../library/prismadb';

export default async function handler(req, res) {
  // Vamos a obtener todos los usuarios desde prisma
  const pensions = await prisma.pension.findMany({
    include: {
      reviews: true,
      HomeOwner: {
        include: {
          user: true,
        },
      },
    },
  });

  res.status(200).json(pensions);
}
