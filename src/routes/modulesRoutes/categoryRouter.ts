import { Router } from "express";
import { Knex } from "knex";
import CategoryController from "@controllers/category/categoryController";



const categoryRoutes = (db: Knex) => {
  const router = Router();
  const controller = new CategoryController(db);

  router.get("/categories", controller.index)
  router.get("/category/:id", controller.getById);
  router.post("/category/add-category", controller.store)
  router.patch("/category/update/:id", controller.update)
  router.post("/category/delete/:id", controller.delete)

  return router;
};

export default categoryRoutes;
