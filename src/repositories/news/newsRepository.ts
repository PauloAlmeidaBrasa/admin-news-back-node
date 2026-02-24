import { BaseRepository } from "../BaseRepository";
import { Knex } from "knex";
import { CreateNewsDTO, GetByIdNewsDTO } from "@contracts/news/newsContractDTO";

export class NewsRepository extends BaseRepository<any> {
  constructor(db: Knex) {
    super("news", db);
  }

  async allNews(clientId: number): Promise<any[]> {
    try {
      return await this.db(this.tableName).select("*").where("client_id", clientId);
    } catch (error) {
      throw this.handleError(error, "allNews");
    }
  }

  async createNews(data: Partial<CreateNewsDTO>): Promise<number> {
    try {
      const result = await this.db(this.tableName).insert(data).returning("id");
      return result[0].id;
    } catch (error) {
      throw this.handleError(error, "createNews");
    }
  }

  async findByNewsId(id: number): Promise<GetByIdNewsDTO> {
    try {
      const news = await this.db(this.tableName)
        .select(
          "id",
          "title",
          "subtitle",
          "text",
          "category_id",
          "created_at",
          "client_id"
        )
        .where("id", id)
        .first();
      return news;
    } catch (error) {
      throw this.handleError(error, "findByNewsId");
    }
  }

  async updateNews(id: number, data: Partial<GetByIdNewsDTO>): Promise<void> {
    try {
      console.log("Updating news with ID:", id, "Data:", data);
      await this.update(id, data);
    } catch (error) {
      throw this.handleError(error, "updateNews");
    }
  }

  async deleteNews(id: number): Promise<void> {
    try {
      await this.delete(id);
    } catch (error) {
      throw this.handleError(error, "deleteNews");
    }
  }
}