import prisma from '../../../library/prismadb';

export default async function handler(req, res) {
  // Vamos a obtener todos los usuarios desde prisma

  const { id } = req.query;

  const pension = await prisma.pension.findUnique({
    where: {
      id,
    },
  });

  res.status(200).json(pension);
}
