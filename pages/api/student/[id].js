import prisma from '../../../library/prismadb';

export default async function handler(req, res) {
  // Vamos a obtener todos los usuarios desde prisma

  const { id } = req.query;

  const student = await prisma.student.findUnique({
    where: {
      userId: id,
    },
    include: {
      favoritePensions: true,
    },
  });

  if (!student) {
    const newStudent = await prisma.student.create({
      data: {
        user: {
          connect: {
            id,
          },
        },
      },
    });

    return res.status(200).json(newStudent);
  }

  return res.status(200).json(student);
}
