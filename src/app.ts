import express from "express";
// import categoryRoutes from "./modules/category/category.routes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// Routes
// app.use("/category", categoryRoutes);

export default app;
