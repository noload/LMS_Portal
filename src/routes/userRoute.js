import { Router } from "express";
import UserController from "../controllers/userController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/",
  AuthMiddleware.authenticate,
  AuthMiddleware.authorizeRoles("Admin"),
  UserController.getAllUsers
);
router.get(
  "/:id",
  AuthMiddleware.authenticate,
  AuthMiddleware.authorizeRoles("Admin"),
  UserController.getUser
);
router.put(
  "/:id",
  AuthMiddleware.authenticate,
  AuthMiddleware.authorizeRoles("Admin"),
  UserController.updateUser
);
router.delete(
  "/:id",
  AuthMiddleware.authenticate,
  AuthMiddleware.authorizeRoles("Admin"),
  UserController.deleteUser
);
router.put(
  "/:id/approve",
  AuthMiddleware.authenticate,
  AuthMiddleware.authorizeRoles("Admin"),
  UserController.approveUser
);

export default router;
