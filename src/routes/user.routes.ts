import { Router } from "express";
// import CategoryController from "./category.controller";

const router = Router()

router.get("/", (req, res) => {
  return res.send("USER workinnnng 🚀");
});

// router.get("/", CategoryController.getAll);
// router.get("/:id", CategoryController.getOne);
// router.post("/", CategoryController.create);

export default router;
