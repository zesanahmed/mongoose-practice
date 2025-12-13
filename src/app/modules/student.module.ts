import { Schema, model, connect } from 'mongoose';
import { Student } from './student/student.interface';

const studentSchema = new Schema<Student>({
  id: { type: String, required: true },
  name: {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  },
  gender: { type: String, enum: ['male', 'female'] },
  dateOfBirth: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+ve', 'A-ve', 'B+ve', 'B-ve', 'AB+ve', 'AB-ve', 'O+ve', 'O-ve'],
  },
  email: { type: String, required: true },
  avatar: { type: String },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    fatherName: { type: String },
    fatherOccupation: { type: String },
    fatherContactNo: { type: String },
    motherName: { type: String },
    motherOccupation: { type: String },
  },
  localGuardian: {
    name: { type: String },
    occupation: { type: String },
    contactNo: { type: String },
    relation: { type: String },
  },
  profileImage: { type: String },
  isActive: { type: Boolean },
});
