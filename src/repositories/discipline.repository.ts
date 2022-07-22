import prisma from '../config/database.js';

export const getById = async (id: number) => {
  const discipline = await prisma.discipline.findUnique({
    where: { id },
  });

  return discipline;
};
