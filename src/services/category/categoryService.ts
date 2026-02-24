import { CategoryRepository } from "@repositories/category/categoryRepository";
import { GetByIdDTO } from "@contracts/categories/categoryContractDTO";

export class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor(repo: CategoryRepository) {
    this.categoryRepository = repo;
  }

  async allCategories(clientId: number): Promise<any[]> {
    return this.categoryRepository.allCategories(clientId);
  }

  async createCategory(data: any): Promise<number> {
    return this.categoryRepository.createCategory(data);
  }
  async getCategoryById(id: number): Promise<GetByIdDTO> {
    const category = await this.categoryRepository.findByCategoryId(id);
    if (!category) throw new Error("Category not found");
    return category;
  }
  async update(id: number, data: GetByIdDTO): Promise<void> {
    return await this.categoryRepository.updateCategory(id, data)
  }
  async deleteCategory(id: number): Promise<void> {
    await this.categoryRepository.deleteCategory(id);
  }
}
