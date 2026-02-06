import { Router } from "express";
import ClientController from "@controllers/client/clientController";
import { Knex } from "knex";
import CategoryController from "@controllers/category/categoryController";



const clientRoutes = (db: Knex) => {
  const router = Router();
  const controller = new CategoryController(db);

  router.get("/categories", controller.index)
//   router.get("/client/:id", controller.getById);
//   router.post("/client/create", controller.store)
//   router.patch("/client/update/:id", controller.update)
//   router.post("/client/delete/:id", controller.delete)

  return router;
};

export default clientRoutes;
