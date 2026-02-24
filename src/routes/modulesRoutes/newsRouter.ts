import { Router } from "express";
import { Knex } from "knex";
import NewsController from "@controllers/news/newsController";
import { Response } from "express";

const newsRoutes = (db: Knex) => {
  const router = Router();
  const controller = new NewsController(db);

  router.get("/news", controller.index);
  router.get("/news/:id", controller.getById);
  router.post("/news/add-news", controller.store);
  router.patch("/news/update/:id", controller.update);
  router.post("/news/delete/:id", controller.delete);

  return router;
};

export default newsRoutes;