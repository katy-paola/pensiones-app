import prisma from '../../../library/prismadb';

export default async function handler(req, res) {
  const { title, description, rating, pensionId, authorId } = req.body;

  const student = await prisma.student.findUnique({
    where: {
      userId: authorId,
    },
  });

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  const user = await prisma.review.create({
    data: {
      title,
      description,
      rating,
      pension: {
        connect: {
          id: pensionId,
        },
      },
      author: {
        connect: {
          id: student.id,
        },
      },
    },
  });

  res.status(200).json(user);
}
