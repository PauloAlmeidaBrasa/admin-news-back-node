import { Router } from "express";
import ClientController from "@controllers/client/clientController";
import { Knex } from "knex";



const clientRoutes = (db: Knex) => {
  const router = Router();
  const controller = new ClientController(db);

  router.get("/client", controller.index)
//   router.get("/client/:id", controller.getById);
//   router.post("/client/create", controller.store)
//   router.patch("/client/update/:id", controller.update)
//   router.post("/client/delete/:id", controller.delete)

  return router;
};

export default clientRoutes;
