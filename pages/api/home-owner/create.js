import prisma from '../../../library/prismadb';

export default async function handler(req, res) {
  const { phone, address, userId } = req.body;

  const homeOwner = await prisma.homeOwner.create({
    data: {
      phone,
      address,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  res.status(200).json(homeOwner);
}
