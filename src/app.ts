import express from "express";
import cors from "cors"
import routes from "./routes";
import { errorHandler } from "./middleware/errorMiddleware"
import { corsMiddleware } from "./middleware/corsMiddleware";


// import categoryRoutes from "./modules/category/category.routes";

const app = express();

app.use(express.json());
app.use(corsMiddleware);
app.use(routes)
app.use(errorHandler)

// app.get("/", (req, res) => {
//   return res.send("API is workinnnng 🚀");
// });


export default app;
