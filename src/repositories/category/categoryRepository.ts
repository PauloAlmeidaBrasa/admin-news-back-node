import { BaseRepository } from "../BaseRepository";
import { Knex } from "knex";
import { CreateDTO } from "contracts/categories/categoryContractDTO";

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
  async createCategory(data: Partial<CreateDTO>): Promise<number> {
      const user = this.create(data)
      return user;
  }
}
