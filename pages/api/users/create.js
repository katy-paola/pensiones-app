import prisma from '../../../library/prismadb';

export default async function handler(req, res) {
  const { name, password, lastName, email, image, rol } = req.body;

  const user = await prisma.user.create({
    data: {
      name,
      password,
      lastName,
      email,
      image,
      rol,
    },
  });

  res.status(200).json(user);
}
