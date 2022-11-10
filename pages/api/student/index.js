import prisma from '../../../library/prismadb';

export default async function handler(req, res) {
  //Vamos a obtener todos los usuarios desde prisma
  const students = await prisma.student.findMany();
  res.status(200).json(students);
}
