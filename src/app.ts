import express from "express";
import { errorHandler } from "./middleware/errorMiddleware"
import { corsMiddleware } from "./middleware/corsMiddleware";
import registerRouter from "@routes/index";
import { Knex } from "knex";

console.log('jj')

export const createApp = (db: Knex) => {
  const app = express();

  app.use(express.json());
  app.use(corsMiddleware);
  app.use(registerRouter(db))
  app.use(errorHandler)

  return app
}
