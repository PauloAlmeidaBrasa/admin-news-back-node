import { Router } from "express"
import AuthenticationController from "@controllers/auth/authenticationController"
import { Knex } from "knex"

const authenticationRoutes = (db: Knex) => {
  const router = Router()
  const controller = new AuthenticationController(db)

  router.post("/authentication", controller.auth)

  return router
}

export default authenticationRoutes
