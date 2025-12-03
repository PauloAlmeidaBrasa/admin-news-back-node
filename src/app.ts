import express from "express";
import cors from "cors"
import routes from "./routes";


// import categoryRoutes from "./modules/category/category.routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes)

// app.get("/", (req, res) => {
//   return res.send("API is workinnnng 🚀");
// });


export default app;
