import prisma from '../../../library/prismadb';

export default async function handler(req, res) {
  // Vamos a obtener todos los usuarios desde prisma

  const { pensionId, userId } = req.body;

  if (req.method === 'POST') {
    const response = await prisma.student.update({
      where: {
        userId,
      },
      data: {
        favoritePensions: {
          connect: {
            id: pensionId,
          },
        },
      },
    });

    res.status(200).json(response);
  }

  if (req.method === 'PUT') {
    const response = await prisma.student.update({
      where: {
        userId,
      },
      data: {
        favoritePensions: {
          disconnect: {
            id: pensionId,
          },
        },
      },
    });

    res.status(200).json(response);
  }
}
