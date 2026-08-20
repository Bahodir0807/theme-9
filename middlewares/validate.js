const { z } = require('zod');
const AppError = require('../utils/AppError');

const createTaskSchema = z.object({
  body: z.object({
    title: z.string({ error: 'Title is required' }).min(3),
    description: z.string().optional(),
    status: z.enum(['pending', 'in-progress', 'completed']).default('pending')
  }).strict()
});

const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    description: z.string().optional(),
    status: z.enum(['pending', 'in-progress', 'completed']).optional()
  }).strict()
});

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params
  });

  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      field: err.path.join('.'),
      message: err.message
    }));

    return next(new AppError('Validation Error', 400, errors));
  }

  if (result.data.body) {
    req.body = result.data.body;
  }

  next();
};

module.exports = { validate, createTaskSchema, updateTaskSchema };
