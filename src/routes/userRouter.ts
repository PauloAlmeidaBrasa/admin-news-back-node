import { Router } from "express";
import UserController from '@controllers/user/userController'

const router = Router()

router.get("/user", UserController.index)
router.get("/user/:id", UserController.getById);
router.post("/user/create", UserController.store);

export default router;
