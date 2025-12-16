import { Router } from "express";
import userRoutes  from "@routes/userRouter"
import authenticationRoutes from "@routes/authenticationRouter"
import { authMiddleware } from "middleware/authMiddleware"
import { Knex } from "knex";
import docRoutes from "@routes/docRouter";


const registerRouter = (db: Knex) => {

  const router = Router();
  const API_VERSION = process.env.API_VERSION || "v1"

  router.use(`/${API_VERSION}`,authenticationRoutes(db)) //public routes
  router.use(`/${API_VERSION}`,docRoutes())


  router.use(`/${API_VERSION}`,authMiddleware,userRoutes(db)) //auth routes



  return router
}

export default registerRouter