import prisma from '../../../library/prismadb';

export default async function handler(req, res) {
  const {
    name,
    description,
    image,
    price,
    location,
    address,
    amenities,
    services,
    rules,
    userId,
  } = req.body;

  const homeOwner = await prisma.homeOwner.findUnique({
    where: {
      userId,
    },
  });

  const pension = await prisma.pension.create({
    data: {
      name,
      description,
      image,
      price,
      location,
      address,
      amenities,
      services,
      rules,
      HomeOwner: {
        connect: {
          id: homeOwner.id,
        },
      },
    },
  });

  res.status(200).json(pension);
}
