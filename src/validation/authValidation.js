import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 3 characters long.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Please enter a valid email address.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters long.",
  }),
  role: Joi.string()
    .valid("Admin", "Librarian", "Member")
    .default("member")
    .messages({
      "any.only": "Role must be either admin, librarian, or member.",
    }),
  isApproved: Joi.boolean().default(false),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Please enter a valid email address.",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required.",
  }),
});
