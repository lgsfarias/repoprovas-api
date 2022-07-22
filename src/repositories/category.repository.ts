import prisma from '../config/database.js';

export const getById = async (id: number) => {
  const category = await prisma.category.findUnique({
    where: { id },
  });

  return category;
};
