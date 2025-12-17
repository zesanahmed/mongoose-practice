import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  StudentModel,
  TUserName,
} from './student/student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    maxLength: [20, 'First name cannot be more than 20 characters'],
    validate: {
      validator: function (v: string) {
        const nameRegex = v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
        return nameRegex === v;
      },
      message: 'First name must start with a capital letter',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact number is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local guardian name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contact number is required'],
  },
  relation: {
    type: String,
    required: [true, 'Local guardian relation is required'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
  id: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
  },
  name: {
    type: userNameSchema,
    required: [true, 'Student name is required'],
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not a valid gender',
    },
  },
  dateOfBirth: {
    type: String,
    required: [true, 'Date of birth is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: [
        'A+ve',
        'A-ve',
        'B+ve',
        'B-ve',
        'AB+ve',
        'AB-ve',
        'O+ve',
        'O-ve',
      ],
      message: '{VALUE} is not a valid blood group',
    },
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
  },
  avatar: {
    type: String,
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian information is required'],
  },
  profileImage: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

studentSchema.methods.isStudentExist = async function (
  id: string,
): Promise<TStudent | null> {
  const student = await Student.findOne({ id });
  return student;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
