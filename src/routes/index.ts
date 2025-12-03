import { Router } from "express";
import userRoutes from "../routes/user.routes"

const router = Router();

const API_VERSION = process.env.API_VERSION || "v1";

router.use(`/${API_VERSION}`,userRoutes);

export default router;