import { Router } from "express";
import authRoute from "./authRoutes.js";
import userRoute from "./userRoute.js";
import bookRoute from "./bookRoute.js";
import bookBorrowRoute from "./borrowedBookRoute.js";
const router = Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/books", bookRoute);
router.use("/borrowings", bookBorrowRoute);
export default router;
