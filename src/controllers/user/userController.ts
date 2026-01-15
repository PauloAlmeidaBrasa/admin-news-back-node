// src/modules/user/user.controller.ts
import { Request, Response } from "express";
import { UserService } from "@services/user/UserService";
import { UserRepository } from "@repositories/user/UserRepository";
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

  /**
 * @openapi
 * /user/:
 *   get:
 *     tags:
 *       - User
 *     summary: List users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     responses:
 *       200:
 *         description: All users 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAll'
 *       500:
 *         description: Internal server error
 */

  index = async (req: Request, res: Response) => {

    const users = await this.userService.findAll(req.user.client_id);
    res.json(users);
  }

/**
 * @openapi
 * /user/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Get user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserById'
 *       404:
 *         description: User not found
 */
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

/**
 * @openapi
 * /user/create:
 *   post:
 *     tags:
 *       - User
 *     summary: Create user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 */

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

  
/**
 * @openapi
 * /user/update/{id}:
 *   patch:
 *     tags:
 *       - User
 *     summary: Update user data
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserUpdate'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
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

    
/**
 * @openapi
 * /user/delete/{id}:
 *   post:
 *     tags:
 *       - User
 *     summary: Delete User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteUser'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

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
