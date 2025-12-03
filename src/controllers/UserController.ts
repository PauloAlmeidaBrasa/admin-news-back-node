// src/modules/user/user.controller.ts
import { Request, Response } from "express";
import { UserService } from "@services/UserService";
import { User } from "@models/UserModel";

const userService = new UserService();

export default class UserController {
  static async index(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const user = await userService.getUserById(Number(req.params.id));
      res.json(user);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  }

  static async store(req: Request, res: Response) {
    try {
      const id = await userService.createUser(req.body);
      res.status(201).json({ id });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

//   static async update(req: Request, res: Response) {
//     try {
//       await userService.updateUser(Number(req.params.id), req.body);
//       res.json({ message: "Updated successfully" });
//     } catch (err: any) {
//       res.status(400).json({ message: err.message });
//     }
//   }

//   static async delete(req: Request, res: Response) {
//     try {
//       await userService.deleteUser(Number(req.params.id));
//       res.json({ message: "Deleted successfully" });
//     } catch (err: any) {
//       res.status(400).json({ message: err.message });
//     }
//   }
}
