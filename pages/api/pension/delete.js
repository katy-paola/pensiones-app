import prisma from '../../../library/prismadb';

export default async function handler(req, res) {
  const { pensionId } = req.body;

  const pension = await prisma.pension.delete({
    where: {
      id: pensionId,
    },
  });

  res.status(200).json(pension);
}
