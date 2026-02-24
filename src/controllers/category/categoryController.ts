// src/modules/user/user.controller.ts
import { Request, Response } from "express";
import { CategoryService } from "@services/category/categoryService";
import { CategoryRepository } from "@repositories/category/categoryRepository";
import { CategoryRequestHandler } from "./categoryRequestHandler";
import { CreateResponse } from "@contracts/user/userContractsRequest";
import { Knex } from "knex";
import { ApiResponse } from "@utils/response";



export default class CategoryController {
  private categoryService: CategoryService;
  
  constructor(db: Knex) {
    const categoryRepository = new CategoryRepository(db);
    this.categoryService = new CategoryService(categoryRepository);

  }

  /**
 * @openapi
 * /categories/:
 *   get:
 *     tags:
 *       - Category
 *     summary: List category 
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     responses:
 *       200:
 *         description: All category 
 *         content:
 *           application/json:
 *             schema:  
 *               $ref: '#/components/schemas/CategoryAllSchema'
 *       500:
 *         description: Internal server error
 */

  index = async (req: Request, res: Response) => {

    const categories = await this.categoryService.allCategories(req.user.client_id);
    return ApiResponse.success(res, 'category', categories);
  }

/**
 * @openapi
 * /category/{id}:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get category by ID
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
 *         description: Category found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryById'
 *       404:
 *         description: Category not found
 */
  getById = async (req: Request, res: Response) => {

    const requesValidate = CategoryRequestHandler.validateToGetById(req.params.id)
    if(requesValidate.error) {
      throw new Error(`category error: ${requesValidate.message}`)
    }
    const category = await this.categoryService.getCategoryById(Number(req.params.id))
    console.log(category)

    return ApiResponse.success(res, 'category', category);
  }

/**
 * @openapi
 * /category/add-category:
 *   post:
 *     tags:
 *       - Category
 *     summary: Create category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *      - in: path
 *        name: description
 *        required: false   
 *        schema: string
 *     responses:
 *       201:
 *         description: category created
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

    const requesValidate = CategoryRequestHandler.validateToCreate(req.body)
    if(requesValidate.error) {
      throw new Error(`Category error: ${requesValidate.message}`)
    }

    req.body.client_id = req.user.client_id

    const id = await this.categoryService.createCategory(req.body);

    const response: CreateResponse = {
      success: true,
      message: `Category added with id ${id}`
    };

    res.status(201).json(response);
  }

  
/**
 * @openapi
 * /category/update/{id}:
 *   patch:
 *     tags:
 *       - Category
 *     summary: Update category data
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
 *         description: Category updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
    update = async (req: Request, res: Response) => {

      const requesValidate = CategoryRequestHandler.validateToUpdate(req.params.id,req.body)
      if(requesValidate.error) {
        throw new Error(`User error: ${requesValidate.message}`)
      }

      const userId = Number(req.params.id)
      const fieldsUpdate = req.body

      await this.categoryService.update(userId,fieldsUpdate);
      return ApiResponse.message(res, "Category updated successfully");

    }

    
/**
 * @openapi
 * /category/delete/{id}:
 *   post:
 *     tags:
 *       - Category
 *     summary: Delete category
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
 *         description: Category deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

  delete = async (req: Request, res: Response) => {
    try {
      const requesValidate = CategoryRequestHandler.validateToDelete(req.params.id)
      if(requesValidate.error) {
        throw new Error(`Category error: ${requesValidate.message}`)
      }
      await this.categoryService.deleteCategory(Number(req.params.id));
      ApiResponse.message(res, "Category deleted successfully");
    } catch (err: any) {
      ApiResponse.error(res, err.message || "Error deleting category");
    }
  }
}
