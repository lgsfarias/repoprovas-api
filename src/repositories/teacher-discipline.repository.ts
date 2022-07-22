import prisma from '../config/database.js';

export const getByTeacherAndDisciplineIds = async (
  teacherId: number,
  disciplineId: number,
) => {
  const teacherDiscipline = await prisma.teacherDiscipline.findFirst({
    where: { AND: { disciplineId, teacherId } },
  });

  return teacherDiscipline;
};
