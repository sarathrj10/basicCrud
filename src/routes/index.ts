import express from "express";
import bookApi from "../api/book";
import userApi from "../api/user";
import authGuard from "../middleware";

const router = express.Router();

router.use("/api/user", userApi);
router.use("/api/book", authGuard, bookApi);

export default router;
