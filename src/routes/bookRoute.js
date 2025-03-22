import { Router } from "express";
import BookController from "../controllers/bookController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post(
  "/",
  AuthMiddleware.authenticate,
  AuthMiddleware.authorizeRoles("Admin"),
  BookController.createBook
);

router.get("/", AuthMiddleware.authenticate, BookController.getAllBooks);

router.get("/:id", AuthMiddleware.authenticate, BookController.getBookById);

router.put(
  "/:id",
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
