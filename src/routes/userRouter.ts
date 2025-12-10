import { Router } from "express";
import UserController from '@controllers/user/userController'

const router = Router()

router.get("/user", UserController.index)
router.get("/user/:id", UserController.getById);
router.post("/user/create", UserController.store)
router.patch("/user/update/:id", UserController.update)
router.post("/user/delete/:id", UserController.delete)

export default router;
