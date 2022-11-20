import prisma from '../../../library/prismadb';

export default async function handler(req, res) {
  const { userId } = req.body;

  const student = await prisma.student.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  res.status(200).json(student);
}
