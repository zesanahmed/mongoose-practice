import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body;

    //will call service here to send data to database
    const result = await StudentServices.createStudentIntoDB(studentData);
    //send response
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create student',
      error: (error as Error).message,
    });
  }
};

export const StudentController = {
  createStudent,
};
