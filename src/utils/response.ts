import { Response } from "express";

export class ApiResponse {
  static success(res: Response, key: string, data: any, statusCode = 200) {
    return res.status(statusCode).json({
      [key]: data,
    });
  }

  static error(res: Response, message: string, statusCode = 400, details = null) {
    return res.status(statusCode).json({
      error: {
        message,
        details,
      },
    });
  }
  static message(res: Response, message: string, statusCode = 200, additionalData = {}) {
    return res.status(statusCode).json({
      status: true,
      message,
      ...additionalData, 
    });
  }
}

// module.exports = default ApiResponse;