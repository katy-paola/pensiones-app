import prisma from '../../../library/prismadb';

export default async function handler(req, res) {
  // Vamos a obtener todos los usuarios desde prisma

  const { id } = req.query;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      homeOwner: true,
      student: true,
    },
  });
  res.status(200).json(user);
}
