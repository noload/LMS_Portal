import express from "express";
import ValidationMiddleware from "../middleware/validationMiddleware.js";
import { loginSchema, registerSchema } from "../validation/authValidation.js";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/register",
  ValidationMiddleware.validate(registerSchema),
  authController.register
);

router.post(
  "/login",
  ValidationMiddleware.validate(loginSchema),
  authController.login
);

export default router;
