import { Router } from "express";
import { 
  userRoutes,
  clientRoutes,
  categoryRoutes,
  newsRoutes
 } from "@routes/modulesRoutes";
import authenticationRoutes from "@routes/authenticationRouter"
import { authMiddleware } from "middleware/authMiddleware"
import { Knex } from "knex";
import docRoutes from "./docRouter";


const registerRouter = (db: Knex) => {

  const router = Router();
  const API_VERSION = process.env.API_VERSION || "v1"

  router.use(`/${API_VERSION}`,authenticationRoutes(db)) //public routes
  // router.use(`/${API_VERSION}`,docRoutes())


  // router.use(`/${API_VERSION}`,authMiddleware,userRoutes(db)) //auth routes
  // router.use(`/${API_VERSION}`,authMiddleware,clientRoutes(db))
  router.use(`/${API_VERSION}`,authMiddleware,categoryRoutes(db))
  router.use(`/${API_VERSION}`,authMiddleware,newsRoutes(db))



  // router.get('/arr', (req, res) => {
  //   res.json({ message: "Welcome to the News Orchestrator API" });
  // })



  return router
}

export default registerRouter