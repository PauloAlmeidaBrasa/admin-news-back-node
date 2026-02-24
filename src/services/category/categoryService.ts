import { CategoryRepository } from "@repositories/category/categoryRepository";

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
}
