import express from "express";
// import categoryRoutes from "./modules/category/category.routes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("API is workinnnng 🚀");
});


export default app;
