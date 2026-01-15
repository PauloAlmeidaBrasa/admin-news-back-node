import { Request, Response } from "express";
import { AuthenticationService  } from "@services/authenticationService";
import { UserRepository } from "@repositories/user/UserRepository";
import { AuthRequestHandler } from "./authRequestHandler";
import { Knex } from "knex";


export default class AuthenticationController {

  public authService: AuthenticationService
    
  constructor(db: Knex) {
    const userRepository = new UserRepository(db);
    this.authService = new AuthenticationService(userRepository);
  }

  auth = async (req: Request, res: Response) => {
    
    const requesValidate = AuthRequestHandler.validateAuth(req.body.email,req.body.password)
    if(requesValidate.error) {
      throw new Error(`User error: ${requesValidate.message}`)
    }
    const email = req.body.email
    const pass = req.body.password

    const user = await this.authService.authentication({email:email,password:pass})

    res.json(user)
  }
}
