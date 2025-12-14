import { StudentModel } from '../student.module';
import { Student } from './student.interface';

const createStudentIntoDB = async (student: Student) => {
  //logic to save student into database
  const result = await StudentModel.create(student);
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
};
