import { Router } from "express";
import userRoutes from "@routes/userRouter"
import authenticationRoutes from "@routes/authenticationRouter"
import { authMiddleware } from "middleware/authMiddleware"

const router = Router();

const API_VERSION = process.env.API_VERSION || "v1"

router.use(`/${API_VERSION}`,authenticationRoutes) //public route

router.use(`/${API_VERSION}`,authMiddleware,userRoutes)

export default router