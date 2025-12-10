import { Router } from "express";
import AuthenticationController from "@controllers/auth/authenticationController";

const router = Router()

router.post("/authentication", AuthenticationController.auth)

export default router;
