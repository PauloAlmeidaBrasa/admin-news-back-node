import express from "express";
import { errorHandler } from "./middleware/errorMiddleware"
import { corsMiddleware } from "./middleware/corsMiddleware";
import registerRouter from "@routes/index";
import { Knex } from "knex";


export const createApp = (db: Knex) => {
  const app = express();

  console.log('testing pipeline')

  /// console.log("🧪 DB IN APPLICATION:", db);


  app.use(express.json());
  app.use(corsMiddleware);
  app.use(registerRouter(db))
  app.use(errorHandler)

  return app
}
