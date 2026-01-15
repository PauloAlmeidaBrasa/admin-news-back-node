// src/modules/user/user.controller.ts
import { Request, Response } from "express";
import { ClientService } from "@services/client/clientService";
import { ClientRepository } from "@repositories/client/clientRepository";
import { ClientRequestHandler } from "./clientRequestHandler";
import { GetClientByIdResponse } from "@contracts/client/clientContractsRequest";
import { Knex } from "knex";



export default class ClientController {
  private clientService: ClientService;
  
  constructor(db: Knex) {
    const userRepository = new ClientRepository(db);
    this.clientService = new ClientService(db,userRepository);
  }

  /**
 * @openapi
 * /client/:
 *   get:
 *     tags:
 *       - Client
 *     summary: List clients 
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     responses:
 *       200:
 *         description: All clients 
 *         content:
 *           application/json:
 *             schema:  
 *               $ref: '#/components/schemas/ClientAll'
 *       500:
 *         description: Internal server error
 */

  index = async (req: Request, res: Response) => {

    const clients = await this.clientService.findAll(req.user.client_id);
    res.json(clients);
  }

/**
 * @openapi
 * /client/{id}:
 *   get:
 *     tags:
 *       - Client
 *     summary: Get client by ID
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
 *         description: Client found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserById'
 *       404:
 *         description: Client not found
 */
  getById = async (req: Request, res: Response) => {

    console.log(req.params)
    const requesValidate = ClientRequestHandler.validateToGetById(req.params.id)
    if(requesValidate.error) {
      throw new Error(`client error: ${requesValidate.message}`)
    }
    const client = await this.clientService.getClientById(Number(req.params.id))

    const response: GetClientByIdResponse = {
      success: true,
      data: {
        name: client.name,
        address: client.address
      }
    };

    res.status(200).json(response)
  }

/**
 * @openapi
 * /client/create:
 *   post:
 *     tags:
 *       - User
 *     summary: Create client
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
 *         description: client created
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

//   store = async (req: Request, res: Response) => {

//     const requesValidate = ClientRequestHandler.validateToCreate(req.body)
//     if(requesValidate.error) {
//       throw new Error(`User error: ${requesValidate.message}`)
//     }

//     req.body.client_id = req.user.client_id

//     const id = await this.userService.createUser(req.body);

//     const response: CreateUserResponse = {
//       success: true,
//       message: `User added with id ${id}`
//     };

//     res.status(201).json(response);
//   }

  
/**
 * @openapi
 * /client/update/{id}:
 *   patch:
 *     tags:
 *       - client
 *     summary: Update client data
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
 *         description: client updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientUpdate'
 *       404:
 *         description: client not found
 *       500:
 *         description: Internal server error
 */
//   update = async (req: Request, res: Response) => {

//     const requesValidate = ClientRequestHandler.validateToUpdate(req.params.id)
//     if(requesValidate.error) {
//       throw new Error(`User error: ${requesValidate.message}`)
//     }

//     const userId = Number(req.params.id)
//     const fieldsUpdate = req.body

//     await this.userService.update(userId,fieldsUpdate);
//     res.json({ message: "Updated successfully" });
//   }

    
/**
 * @openapi
 * /client/delete/{id}:
 *   post:
 *     tags:
 *       - client
 *     summary: Delete client
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
 *         description: client deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Deleteclient'
 *       404:
 *         description: user not found
 *       500:
 *         description: Internal server error
 */

//   delete = async (req: Request, res: Response) => {
//     try {
//       const requesValidate = ClientRequestHandler.validateToDelete(req.params.id)
//       if(requesValidate.error) {
//         throw new Error(`client error: ${requesValidate.message}`)
//       }
//       await this.userService.deleteUser(Number(req.params.id));
//       res.json({ message: "Deleted successfully" });
//     } catch (err: any) {
//       res.status(400).json({ message: err.message });
//     }
//   }
}
