import { Request, Response } from "express";
import { AuthenticationService  } from "@services/authenticationService";
import { UserRepository } from "@repositories/UserRepository";
import { AuthRequestHandler } from "./authRequestHandler";

const userRepository = new UserRepository();
const authService = new AuthenticationService(userRepository);


export default class AuthenticationController {

  static async auth(req: Request, res: Response) {
    
    const requesValidate = AuthRequestHandler.validateAuth(req.body.email,req.body.password)
    if(requesValidate.error) {
      throw new Error(`User error: ${requesValidate.message}`)
    }
    const email = req.body.email
    const pass = req.body.password
    const user = await authService.authentication({email:email,password:pass})

    res.json(user)
  }
}
