import prisma from '../../../library/prismadb';

export default async function handler(req, res) {
  //Vamos a obtener todos los usuarios desde prisma
  const reviews = await prisma.review.findMany();
  res.status(200).json(reviews);
}
