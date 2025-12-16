import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { studentZodSchema } from './student.zod.validation';
import { ZodError } from 'zod';

const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body.student;

    const zodParsedStudentData = studentZodSchema.parse(studentData);
    // console.log(error, value);
    //will call service here to send data to database
    const result =
      await StudentServices.createStudentIntoDB(zodParsedStudentData);

    // if (error) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Validation failed',
    //     error: error.details.map((err) => err.message),
    //   });
    // }

    //send response
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to create student',
      error: (error as Error).message,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    //call service to get all students from database
    const result = await StudentServices.getAllStudentsFromDB();
    //send response
    res.status(200).json({
      success: true,
      message: 'Students fetched successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to fetch students',
      error: (error as Error).message,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);
    //send response
    res.status(200).json({
      success: true,
      message: 'Student fetched successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to fetch student',
      error: (error as Error).message,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
