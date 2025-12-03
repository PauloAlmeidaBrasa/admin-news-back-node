import { Router } from "express";
import UserController from '@controllers/UserController'
import { Request,Response } from "express";

const router = Router()

// router.get("/", (req, res) => {
//   return res.send("USER workinnnng 🚀");
// });

router.get("/", UserController.index)
// router.get("/:id", CategoryController.getOne);
// router.post("/", CategoryController.create);

export default router;
