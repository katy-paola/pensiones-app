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
    homeOwnerId,
  } = req.body;

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
          id: homeOwnerId,
        },
      },
    },
  });

  res.status(200).json(pension);
}
