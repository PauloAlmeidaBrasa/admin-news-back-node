import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "@utils/jwt";
import { JwtTokenPayload } from "@contracts/jwt";


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Missing Authorization header",
    });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
   const decoded = verifyJwt(token) as JwtTokenPayload;

    req.user = {
      id: decoded.id,
      name: decoded.name,
      client_id: decoded.client_id,
      token,                                                            
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });                                                                                                                                                                                                                                                               
  }
}
