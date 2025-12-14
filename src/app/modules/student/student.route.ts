import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();
// will call controller here
router.post('/student-create', StudentController.createStudent);
