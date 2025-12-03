import cors from "cors";

export const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN?.split(",") || "*", 
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});
