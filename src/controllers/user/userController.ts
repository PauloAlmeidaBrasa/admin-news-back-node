// src/modules/user/user.controller.ts
import { Request, Response } from "express";
import { UserService } from "@services/user/UserService";
import { UserRepository } from "@repositories/UserRepository";
import { UserRequestHandler } from "./userRequestHandler";
// import { UserResponseHandler } from "./userResponseHandler";
import { CreateUserResponse, GetUserByIdResponse } from "contracts/user/userContractsRequest";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export default class UserController {
  static async index(req: Request, res: Response) {

    const users = await userService.findAll(req.user.client_id);
    res.json(users);
  }

  static async getById(req: Request, res: Response) {

    const requesValidate = UserRequestHandler.validateToGetById(req.params.id)
    if(requesValidate.error) {
      throw new Error(`User error: ${requesValidate.message}`)
    }
    const user = await userService.getUserById(Number(req.params.id))

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

  static async store(req: Request, res: Response) {

    const requesValidate = UserRequestHandler.validateToCreate(req.body)
    if(requesValidate.error) {
      throw new Error(`User error: ${requesValidate.message}`)
    }

    const id = await userService.createUser(req.body);

    const response: CreateUserResponse = {
      success: true,
      message: `User added with id ${id}`
    };

    res.status(201).json(response);
  }

  static async update(req: Request, res: Response) {

    const requesValidate = UserRequestHandler.validateToUpdate(req.params.id)
    if(requesValidate.error) {
      throw new Error(`User error: ${requesValidate.message}`)
    }

    const userId = Number(req.params.id)
    const fieldsUpdate = req.body

    await userService.update(userId,fieldsUpdate);
    res.json({ message: "Updated successfully" });
  }

  static async delete(req: Request, res: Response) {
    try {
      const requesValidate = UserRequestHandler.validateToDelete(req.params.id)
      if(requesValidate.error) {
        throw new Error(`User error: ${requesValidate.message}`)
      }
      await userService.deleteUser(Number(req.params.id));
      res.json({ message: "Deleted successfully" });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
