import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("🔥 Error caught by errorHandler:", err);

  let errosCodePrivate = [ //errors that should never be exposed
    'ER_BAD_FIELD_ERROR',
    'ERR_ASSERTION',
    'REPOSITORY_ERROR',
    'ER_NO_TABLES_USED'
  ]

  // Default values
  const status = err.status || 500;
  let message = err.message || "Internal Server Error";

  if (errosCodePrivate.includes(err.code)) {
    message = "Internal Server Error"
  }

  return res.status(status).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
}