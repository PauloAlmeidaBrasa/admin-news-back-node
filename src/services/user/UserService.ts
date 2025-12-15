// src/modules/user/user.service.ts
import bcrypt from "bcrypt";
import { UserRepository } from "@repositories/UserRepository";
import { GetByIdDTO, GetAllDTO, UserDTO } from "contracts/user/userContractsDTO"
import { CreateUseRequest,} from "contracts/user/userContractsRequest";
import { Knex } from "knex";


export class UserService {

  private userRepository: UserRepository;

  constructor(db: Knex, userRepository: UserRepository) {
    this.userRepository = new UserRepository(db)
  }


  async findAll(clientId:number): Promise<GetAllDTO[]> {
    const client_id = clientId
    return this.userRepository.findAllUser(client_id);
  }

  async getUserById(id: number): Promise<GetByIdDTO> {
    const user = await this.userRepository.findByUserId(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  async createUser(data: CreateUseRequest): Promise<number> {
    const existing = await this.userRepository.findByEmail(data.email!);
    if (existing) throw new Error("Email already exists");

    data.client_id = 1

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userData = { ...data, password: hashedPassword };

    const userIdCreated = this.userRepository.createUser(userData);
    return userIdCreated
  }

  async update(id: number, data: UserDTO): Promise<void> {
    return await this.userRepository.updateUser(id, data)
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.deleteUser(id);
  }
}
