import { NewsRepository } from "@repositories/news/newsRepository";
import { GetByIdNewsDTO } from "@contracts/news/newsContractDTO";

export class NewsService {
  private newsRepository: NewsRepository;

  constructor(repo: NewsRepository) {
    this.newsRepository = repo;
  }

  async allNews(clientId: number): Promise<any[]> {
    return this.newsRepository.allNews(clientId);
  }

  async createNews(data: any): Promise<number> {
    return this.newsRepository.createNews(data);
  }

  async getNewsById(id: number): Promise<GetByIdNewsDTO> {
    const news = await this.newsRepository.findByNewsId(id);
    if (!news) throw new Error("News not found");
    return news;
  }

  async update(id: number, data: GetByIdNewsDTO): Promise<void> {
    return await this.newsRepository.updateNews(id, data);
  }

  async deleteNews(id: number): Promise<void> {
    await this.newsRepository.deleteNews(id);
  }
}