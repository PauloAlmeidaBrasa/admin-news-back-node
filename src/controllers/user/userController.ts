// src/modules/user/user.controller.ts
import { Request, Response } from "express";
import { UserService } from "@services/user/UserService";
import { UserRepository } from "@repositories/UserRepository";
import { UserRequestHandler } from "./userRequestHandler";
// import { UserResponseHandler } from "./userResponseHandler";
import { CreateUserResponse, GetUserByIdResponse } from "contracts/user/userContractsRequest"
import { Knex } from "knex";



export default class UserController {
  private userService: UserService;
  
  constructor(db: Knex) {
    const userRepository = new UserRepository(db);
    this.userService = new UserService(db,userRepository);
  }

  index = async (req: Request, res: Response) => {

    const users = await this.userService.findAll(req.user.client_id);
    res.json(users);
  }

  getById = async (req: Request, res: Response) => {

    const requesValidate = UserRequestHandler.validateToGetById(req.params.id)
    if(requesValidate.error) {
      throw new Error(`User error: ${requesValidate.message}`)
    }
    const user = await this.userService.getUserById(Number(req.params.id))

    const response: GetUserByIdResponse = {
      success: true,
      data: {
        name: user.name,
        email: user.email,
        accessLevel: user.accessLevel,
        clientId: user.clientId
      }
    };

    res.status(200).json(response)
  }

  store = async (req: Request, res: Response) => {

    const requesValidate = UserRequestHandler.validateToCreate(req.body)
    if(requesValidate.error) {
      throw new Error(`User error: ${requesValidate.message}`)
    }

    req.body.client_id = req.user.client_id

    const id = await this.userService.createUser(req.body);

    const response: CreateUserResponse = {
      success: true,
      message: `User added with id ${id}`
    };

    res.status(201).json(response);
  }

  update = async (req: Request, res: Response) => {

    const requesValidate = UserRequestHandler.validateToUpdate(req.params.id)
    if(requesValidate.error) {
      throw new Error(`User error: ${requesValidate.message}`)
    }

    const userId = Number(req.params.id)
    const fieldsUpdate = req.body

    await this.userService.update(userId,fieldsUpdate);
    res.json({ message: "Updated successfully" });
  }

  delete = async (req: Request, res: Response) => {
    try {
      const requesValidate = UserRequestHandler.validateToDelete(req.params.id)
      if(requesValidate.error) {
        throw new Error(`User error: ${requesValidate.message}`)
      }
      await this.userService.deleteUser(Number(req.params.id));
      res.json({ message: "Deleted successfully" });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
