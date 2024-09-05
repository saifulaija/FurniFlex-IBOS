import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string({
      invalid_type_error: 'email must be string',
    }),
    password: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .max(20, { message: 'Password can not be more than 20 characters' }),
    profilePhoto: z.string().optional(),
    role: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
};
