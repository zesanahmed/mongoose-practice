import Joi from 'joi';
const userNameJoiSchema = Joi.object({
  firstName: Joi.string()
    .max(20)
    .required()
    .custom((value, helpers) => {
      const formatted =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

      if (formatted !== value) {
        return helpers.message({
          'any.custom': 'First name must start with a capital letter',
        });
      }
      return value;
    })
    .messages({
      'string.base': 'First name must be a string',
      'string.empty': 'First name is required',
      'any.required': 'First name is required',
      'string.max': 'First name cannot be more than 20 characters',
    }),

  middleName: Joi.string().optional(),

  lastName: Joi.string().required().messages({
    'string.empty': 'Last name is required',
    'any.required': 'Last name is required',
  }),
});

const guardianJoiSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.empty': 'Father name is required',
    'any.required': 'Father name is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.empty': 'Father occupation is required',
    'any.required': 'Father occupation is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.empty': 'Father contact number is required',
    'any.required': 'Father contact number is required',
  }),
  motherName: Joi.string().required().messages({
    'string.empty': 'Mother name is required',
    'any.required': 'Mother name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.empty': 'Mother occupation is required',
    'any.required': 'Mother occupation is required',
  }),
});

const localGuardianJoiSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Local guardian name is required',
    'any.required': 'Local guardian name is required',
  }),
  occupation: Joi.string().required().messages({
    'string.empty': 'Local guardian occupation is required',
    'any.required': 'Local guardian occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Local guardian contact number is required',
    'any.required': 'Local guardian contact number is required',
  }),
  relation: Joi.string().required().messages({
    'string.empty': 'Local guardian relation is required',
    'any.required': 'Local guardian relation is required',
  }),
});
const studentJoiSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'Student ID is required',
    'any.required': 'Student ID is required',
  }),

  name: userNameJoiSchema.required().messages({
    'any.required': 'Student name is required',
  }),

  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only': '{#value} is not a valid gender',
    'any.required': 'Gender is required',
  }),

  dateOfBirth: Joi.string().required().messages({
    'string.empty': 'Date of birth is required',
    'any.required': 'Date of birth is required',
  }),

  contactNo: Joi.string().required().messages({
    'string.empty': 'Contact number is required',
    'any.required': 'Contact number is required',
  }),

  emergencyContactNo: Joi.string().required().messages({
    'string.empty': 'Emergency contact number is required',
    'any.required': 'Emergency contact number is required',
  }),

  bloodGroup: Joi.string()
    .valid('A+ve', 'A-ve', 'B+ve', 'B-ve', 'AB+ve', 'AB-ve', 'O+ve', 'O-ve')
    .messages({
      'any.only': '{#value} is not a valid blood group',
    }),

  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email address is required',
  }),

  avatar: Joi.string().optional(),

  presentAddress: Joi.string().required().messages({
    'string.empty': 'Present address is required',
    'any.required': 'Present address is required',
  }),

  permanentAddress: Joi.string().required().messages({
    'string.empty': 'Permanent address is required',
    'any.required': 'Permanent address is required',
  }),

  guardian: guardianJoiSchema.required().messages({
    'any.required': 'Guardian information is required',
  }),

  localGuardian: localGuardianJoiSchema.required().messages({
    'any.required': 'Local guardian information is required',
  }),

  profileImage: Joi.string().optional(),

  isActive: Joi.boolean().default(true),
});
export default studentJoiSchema;
