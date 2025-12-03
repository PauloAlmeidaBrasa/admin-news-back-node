import express from "express";
import routes from "./routes";
import { errorHandler } from "./middleware/errorMiddleware"
import { corsMiddleware } from "./middleware/corsMiddleware";


// import categoryRoutes from "./modules/category/category.routes";

const app = express();

app.use(express.json());
app.use(corsMiddleware);
app.use(routes)
app.use(errorHandler)


export default app;
