import prisma from '../../../library/prismadb';

export default async function handler(req, res) {
  // Vamos a obtener todos los usuarios desde prisma

  const { id } = req.query;

  const homeOwner = await prisma.homeOwner.findUnique({
    where: {
      userId: id,
    },
    include: {
      pension: true,
    },
  });

  res.status(200).json(homeOwner);
}
