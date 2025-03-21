import { Router } from "express";
import userController from "../controllers/userController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/",
  AuthMiddleware.authenticate,
  AuthMiddleware.authorizeRoles("Admin"),
  userController.getAllUsers
);
// router.get("/:id", UserController.getUser);
// router.put("/:id", UserController.updateUser);
// router.delete("/:id", UserController.deleteUser);
// router.put("/:id/approve", UserController.approveUser);

export default router;
