import prisma from '../../../library/prismadb';

export default async function handler(req, res) {
  const { phone, userId, address } = req.body;

  const user = await prisma.homeOwner.update({
    data: {
      phone,
      address,
    },
    where: {
      userId,
    },
  });

  res.status(200).json(user);
}
