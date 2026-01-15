import { Router } from "express";
import UserController from '@controllers/user/userController'
import { Knex } from "knex";



const userRoutes = (db: Knex) => {
  const router = Router();
  const controller = new UserController(db);

  router.get("/user", controller.index)
  router.get("/user/:id", controller.getById);
  router.post("/user/create", controller.store)
  router.patch("/user/update/:id", controller.update)
  router.post("/user/delete/:id", controller.delete)

  return router;
};

export default userRoutes;
