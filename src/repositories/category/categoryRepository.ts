import { BaseRepository } from "../BaseRepository";
import { Knex } from "knex";

export class CategoryRepository extends BaseRepository<any> {
  constructor(db: Knex) {
    super("category", db);
  }

  async allCategories(clientId: number): Promise<any[]> {
    try {
      return await this.db(this.tableName).select("*").where("client_id", clientId);
    } catch (error) {
      throw this.handleError(error, "allCategories");
    }
  }
}
