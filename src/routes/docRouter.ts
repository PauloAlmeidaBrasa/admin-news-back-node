import { Router } from "express"
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../doc/swagger";



const docRoutes = () => {
  const router = Router();
  router.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  )

  return router;
};

export default docRoutes;
