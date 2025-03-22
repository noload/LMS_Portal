import { Router } from "express";
import BookController from "../controllers/bookController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";
import ValidationMiddleware from "../middleware/validationMiddleware.js";
import {
  createBookSchema,
  updateBookSchema,
} from "../validation/bookValidation.js";

const router = Router();

router.post(
  "/",
  ValidationMiddleware.validate(createBookSchema),
  AuthMiddleware.authenticate,
  AuthMiddleware.authorizeRoles("Admin"),
  BookController.createBook
);

router.get("/", AuthMiddleware.authenticate, BookController.getAllBooks);

router.get("/:id", AuthMiddleware.authenticate, BookController.getBookById);

router.put(
  "/:id",
  ValidationMiddleware.validate(updateBookSchema),
  AuthMiddleware.authenticate,
  AuthMiddleware.authorizeRoles("Admin"),
  BookController.updateBook
);

router.delete(
  "/:id",
  AuthMiddleware.authenticate,
  AuthMiddleware.authorizeRoles("Admin"),
  BookController.deleteBook
);

export default router;
