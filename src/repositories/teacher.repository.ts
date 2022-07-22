import prisma from '../config/database.js';

export const getById = async (id: number) => {
  const teacher = await prisma.teacher.findUnique({
    where: { id },
  });

  return teacher;
};
