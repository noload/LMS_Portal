import { Router } from "express";
import AuthMiddleware from "../middleware/authMiddleware.js";
import borrowedBookController from "../controllers/borrowedBookController.js";

const router = Router();

router.post(
  "/borrow",
  AuthMiddleware.authenticate,
  AuthMiddleware.authorizeRoles("Member"),
  borrowedBookController.borrowBook
);

router.post(
  "/return/:id",
  AuthMiddleware.authenticate,
  AuthMiddleware.authorizeRoles("Member"),
  borrowedBookController.returnBook
);

router.get(
  "/history",
  AuthMiddleware.authenticate,
  AuthMiddleware.authorizeRoles("Librarian"),
  borrowedBookController.getAllBorrows
);

router.get(
  "/my-borrows",
  AuthMiddleware.authenticate,
  AuthMiddleware.authorizeRoles("Member"),
  borrowedBookController.getUserBorrowHistory
);

export default router;
