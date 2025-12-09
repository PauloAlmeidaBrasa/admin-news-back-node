import db from "@config/db"
import { GetByIdDTO, CreateDTO, GetAllDTO, UserDTO } from "contracts/user/userContractsDTO";
import { BaseRepository } from "./BaseRepository";

export class UserRepository extends BaseRepository<UserDTO>  {

  constructor() {
    super("users", db);
  }

  async findAllUser(clientId: number): Promise<GetAllDTO[]> {

    return this.findAll(clientId)
  }

  async findByUserId(id: number): Promise<GetByIdDTO | undefined> {
    return this.findById(id)
  }

  async createUser(data: Partial<CreateDTO>): Promise<number> {
    const user = this.create(data)
    return user;
  }

  async findByEmail(email: string): Promise<GetAllDTO | undefined> {
    return this.db('users').where({email}).first()
  }
  async updateUser(id: number,data:UserDTO) {

    await this.update(id,data)
  }
  async deleteUser(id: number) {
    await this.delete(id);
  }
}