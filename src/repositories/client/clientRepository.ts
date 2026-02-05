import { GetAllDTO, GetByIdDTO, CreateDTO, ClientDTO } from "contracts/client/clientContractsDTO";
import { BaseRepository } from "../BaseRepository";
import { Knex } from "knex";

export class ClientRepository extends BaseRepository<GetAllDTO>  {

  constructor(db: Knex) {
    super("client", db);
  }

  async findAllClient(clientId: number): Promise<GetAllDTO[]> {

    return this.findAll(clientId)
  }

  async findByClientId(id: number): Promise<GetByIdDTO | undefined> {
    return this.findById(id)
  }

  async createClient(data: Partial<CreateDTO>): Promise<number> {
    const client = this.create(data)
    return client;
  }


  async updateClient(id: number,data:ClientDTO) {

    await this.update(id,data)
  }
  async deleteClient(id: number) {
    await this.delete(id);
  }
}