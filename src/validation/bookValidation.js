import Joi from "joi";

export const createBookSchema = Joi.object({
  title: Joi.string().trim().min(3).max(255).required().messages({
    "string.empty": "Title is required.",
    "string.min": "Title must be at least 3 characters long.",
    "string.max": "Title must not exceed 255 characters.",
  }),
  author: Joi.string().trim().min(3).max(100).required().messages({
    "string.empty": "Author is required.",
    "string.min": "Author must be at least 3 characters long.",
    "string.max": "Author must not exceed 100 characters.",
  }),
  category: Joi.string().trim().optional().messages({
    "string.empty": "Category cannot be empty.",
  }),
  description: Joi.string().trim().optional().max(1000).messages({
    "string.max": "Description must not exceed 1000 characters.",
  }),
  isbn: Joi.string()
    .trim()
    .pattern(/^\d{3}-\d{10}$/)
    .required()
    .messages({
      "string.empty": "ISBN is required.",
      "string.pattern.base": "ISBN must be in the format 978-XXXXXXXXXX.",
    }),
  availableCopies: Joi.number().integer().min(0).required().messages({
    "number.base": "Available copies must be a number.",
    "number.min": "Available copies cannot be negative.",
  }),
});

export const updateBookSchema = createBookSchema.fork(
  ["title", "author", "isbn"],
  (schema) => schema.optional()
);
