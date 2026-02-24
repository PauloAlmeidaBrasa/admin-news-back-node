import { BaseRepository } from "../BaseRepository";
import { Knex } from "knex";
import { CreateDTO,GetByIdDTO } from "contracts/categories/categoryContractDTO";

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
  async findByCategoryId(id: number): Promise<GetByIdDTO> {
    try {
      const category = await this.db(this.tableName)
        .select(
          "id",
          "name",
          "description",
          "created_at")
        .where("id", id).first();
      return category;
    } catch (error) {
      throw this.handleError(error, "findByCategoryId");
    }
  }
  async updateCategory(id: number, data: Partial<GetByIdDTO>): Promise<void> {
    try {
      console.log("Updating category with ID:", id, "Data:", data);
      await this.update(id,data)   
    } catch (error) {
      throw this.handleError(error, "updateCategory");
    }
  }
  async deleteCategory(id: number): Promise<void> {
    try {
      await this.delete(id);
    } catch (error) {
      throw this.handleError(error, "deleteCategory");
    }
  }
}
