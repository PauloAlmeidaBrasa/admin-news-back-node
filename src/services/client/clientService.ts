import { ClientRepository } from "@repositories/client/clientRepository";
import { GetByIdDTO, GetAllDTO, ClientDTO } from "contracts/client/clientContractsDTO"
import { CreateClientRequest } from "@contracts/client/clientContractsRequest";
import { Knex } from "knex";


export class ClientService {

  private clientRepository: ClientRepository;

  constructor(db: Knex, userRepository: ClientRepository) {
    this.clientRepository = new ClientRepository(db)
  }


  async findAll(clientId:number): Promise<GetAllDTO[]> {
    const client_id = clientId
    return this.clientRepository.findAllClient(client_id);
  }

  async getClientById(id: number): Promise<GetByIdDTO> {
    const client = await this.clientRepository.findByClientId(id);
    if (!client) throw new Error("client not found");
    return client;
  }

  async createClient(data: CreateClientRequest): Promise<number> {

    const clientData = { ...data };

    const clientIdCreated = this.clientRepository.createClient(clientData);
    return clientIdCreated
  }

  async update(id: number, data: ClientDTO): Promise<void> {
    return await this.clientRepository.updateClient(id, data)
  }

  async deleteClient(id: number): Promise<void> {
    await this.clientRepository.deleteClient(id);
  }
}
