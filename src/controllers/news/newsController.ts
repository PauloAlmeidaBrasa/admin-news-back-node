import { Request, Response } from "express";
import { NewsService } from "@services/news/newsService";
import { NewsRepository } from "@repositories/news/newsRepository";
import { NewsRequestHandler } from "./newsRequestHandler";
import { CreateResponse } from "@contracts/user/userContractsRequest";
import { Knex } from "knex";
import { ApiResponse } from "@utils/response";

export default class NewsController {
  private newsService: NewsService;

  constructor(db: Knex) {
    const newsRepository = new NewsRepository(db);
    this.newsService = new NewsService(newsRepository);
  }

  /**
   * @openapi
   * /news/:
   *   get:
   *     tags:
   *       - News
   *     summary: List news
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: All news
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NewsAllSchema'
   *       500:
   *         description: Internal server error
   */
  index = async (req: Request, res: Response) => {
    const news = await this.newsService.allNews(req.user.client_id);
    return ApiResponse.success(res, "news", news);
  };

  /**
   * @openapi
   * /news/{id}:
   *   get:
   *     tags:
   *       - News
   *     summary: Get news by ID
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
   *         description: News found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NewsById'
   *       404:
   *         description: News not found
   */
  getById = async (req: Request, res: Response) => {
      console.log('GET BY ID')
    const requestValidate = NewsRequestHandler.validateToGetById(req.params.id);
    if (requestValidate.error) {
      throw new Error(`News error: ${requestValidate.message}`);
    }
    const news = await this.newsService.getNewsById(Number(req.params.id));
    return ApiResponse.success(res, "news", news);
  };

  /**
   * @openapi
   * /news/add-news:
   *   post:
   *     tags:
   *       - News
   *     summary: Create news
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               subtitle:
   *                 type: string
   *               text:
   *                 type: string
   *               category_id:
   *                 type: integer
   *     responses:
   *       201:
   *         description: News created
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
    console.log('STORE')
    const requestValidate = NewsRequestHandler.validateToCreate(req.body);
    if (requestValidate.error) {
      throw new Error(`News error: ${requestValidate.message}`);
    }

    req.body.client_id = req.user.client_id;

    const id = await this.newsService.createNews(req.body);

    const response: CreateResponse = {
      success: true,
      message: `News added with id ${id}`,
    };

    res.status(201).json(response);
  };

  /**
   * @openapi
   * /news/update/{id}:
   *   patch:
   *     tags:
   *       - News
   *     summary: Update news data
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               subtitle:
   *                 type: string
   *               text:
   *                 type: string
   *               category_id:
   *                 type: integer
   *     responses:
   *       200:
   *         description: News updated
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
   *         description: News not found
   *       500:
   *         description: Internal server error
   */
  update = async (req: Request, res: Response) => {
    const requestValidate = NewsRequestHandler.validateToUpdate(
      req.params.id,
      req.body
    );
    if (requestValidate.error) {
      throw new Error(`News error: ${requestValidate.message}`);
    }

    const newsId = Number(req.params.id);
    const fieldsUpdate = req.body;

    await this.newsService.update(newsId, fieldsUpdate);
    return ApiResponse.message(res, "News updated successfully");
  };

  /**
   * @openapi
   * /news/delete/{id}:
   *   post:
   *     tags:
   *       - News
   *     summary: Delete news
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
   *         description: News deleted
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
   *         description: News not found
   *       500:
   *         description: Internal server error
   */
  delete = async (req: Request, res: Response) => {
    try {
      const requestValidate = NewsRequestHandler.validateToDelete(req.params.id);
      if (requestValidate.error) {
        throw new Error(`News error: ${requestValidate.message}`);
      }
      await this.newsService.deleteNews(Number(req.params.id));
      ApiResponse.message(res, "News deleted successfully");
    } catch (err: any) {
      ApiResponse.error(res, err.message || "Error deleting news");
    }
  };
}