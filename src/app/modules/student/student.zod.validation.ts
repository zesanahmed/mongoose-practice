import { z } from 'zod';

export const userNameZodSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(20, 'First name cannot be more than 20 characters')
    .refine(
      (value) => {
        const formatted =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return formatted === value;
      },
      {
        message: 'First name must start with a capital letter',
      },
    ),

  middleName: z.string().optional(),

  lastName: z.string().min(1, 'Last name is required'),
});
export const guardianZodSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required'),

  fatherOccupation: z.string().min(1, 'Father occupation is required'),

  fatherContactNo: z.string().min(1, 'Father contact number is required'),

  motherName: z.string().min(1, 'Mother name is required'),

  motherOccupation: z.string().min(1, 'Mother occupation is required'),
});
export const localGuardianZodSchema = z.object({
  name: z.string().min(1, 'Local guardian name is required'),

  occupation: z.string().min(1, 'Local guardian occupation is required'),

  contactNo: z.string().min(1, 'Local guardian contact number is required'),

  relation: z.string().min(1, 'Local guardian relation is required'),
});
export const studentZodSchema = z.object({
  id: z.string().min(1, 'Student ID is required'),

  name: userNameZodSchema,

  gender: z.enum(['male', 'female'], {
    message: 'Gender must be either male or female',
  }),

  dateOfBirth: z.string().min(1, 'Date of birth is required'),

  contactNo: z.string().min(1, 'Contact number is required'),

  emergencyContactNo: z.string().min(1, 'Emergency contact number is required'),

  bloodGroup: z
    .enum(['A+ve', 'A-ve', 'B+ve', 'B-ve', 'AB+ve', 'AB-ve', 'O+ve', 'O-ve'])
    .optional(),

  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Email must be a valid email address'),

  avatar: z.string().optional(),

  presentAddress: z.string().min(1, 'Present address is required'),

  permanentAddress: z.string().min(1, 'Permanent address is required'),

  guardian: guardianZodSchema,

  localGuardian: localGuardianZodSchema,

  profileImage: z.string().optional(),

  isActive: z.boolean().default(true),
});
export default studentZodSchema;
