import prisma from '../../../library/prismadb';

export default async function handler(req, res) {
  const { rol, userId, name, lastName, image } = req.body;

  const user = await prisma.user.update({
    data: {
      rol,
      name,
      lastName,
      image,
    },
    where: {
      id: userId,
    },
  });

  res.status(200).json(user);
}
