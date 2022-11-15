import prisma from '../../../library/prismadb';

export default async function handler(req, res) {
  // Vamos a obtener todos los usuarios desde prisma
  const homeOwners = await prisma.homeOwner.findMany();
  res.status(200).json(homeOwners);
}
