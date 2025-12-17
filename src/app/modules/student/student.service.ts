import { Student } from '../student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (student: TStudent) => {
  //logic to save student into database
  // const result = await Student.create(student); //built in static method
  const newStudent = new Student(student); // create instance of model
  if (await newStudent.isStudentExist(student.id)) {
    throw new Error('Student with this ID already exists');
  } // instance method
  const result = await newStudent.save();
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
