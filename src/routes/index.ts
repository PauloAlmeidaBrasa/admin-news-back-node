import { Router } from "express";
import userRoutes from "../routes/user.routes"

const router = Router();

// router.get("/", (req, res) => {
//   res.send("API is running 🚀");
// });

router.use(userRoutes);

export default router;