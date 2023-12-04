const yup = require('yup');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
  createSchema: yup.object({
    body: yup.object({
      fullName: yup
        .string()
        .required('Full name is required!')
        .max(500, 'Full name cannot exceed 500 characters'),

      email: yup
        .string()
        .required()
        // .email()
        .test('email type', '${path} is an invalid email', (value) => {
          const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

          return emailRegex.test(value);
        }),

      phoneNumber: yup
        .string()
        .required()
        .test('phoneNumber type', '${path} is an invalid phone number', (value) => {
          const phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

          return phoneRegex.test(value);
        }),

      city: yup
        .string()
        .required('City is required!'),

      district: yup
        .string()
        .required('District is required!'),

      ward: yup
        .string()
        .required('Ward is required!'),

      street: yup
        .string()
        .max(500, 'Maxium 500 characters')
        .required('Street is required!'),

      birthday: yup
        .date(),

      password: yup
        .string()
        .required()
        .min(6, 'Minimum 6 characters')
        .max(12, 'Minimum 12 characters'),
    }),
  }),

  loginSchema: yup.object({
    body: yup.object({
      email: yup
        .string()
        .required()
        .email(),

      password: yup.string()
        .required()
        .min(6, 'Minimum 6 characters')
        .max(12, 'Minimum 12 characters'),
    }),
  }),
};