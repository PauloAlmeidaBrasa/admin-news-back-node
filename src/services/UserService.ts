// src/modules/user/user.service.ts
import bcrypt from "bcrypt";
import { UserRepository } from "@repositories/UserRepository";
import { User } from "@models/UserModel";
import { GetByIdDTO, GetAllDTO } from "contracts/user/userContractsDTO"
import { CreateUseRequest,} from "contracts/user/userContractsRequest";

export class UserService {

  constructor(private userRepository: UserRepository) {}

  // private userRepository = new UserRepository();

  async getAllUsers(): Promise<GetAllDTO[]> {
    const clientId = 1
    return this.userRepository.findAll(clientId);
  }

  async getUserById(id: number): Promise<GetByIdDTO> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  async createUser(data: CreateUseRequest): Promise<number> {
    const existing = await this.userRepository.findByEmail(data.email!);
    if (existing) throw new Error("Email already exists");

    data.client_id = 1

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userData = { ...data, password: hashedPassword };

    const userIdCreated = this.userRepository.create(userData);
    return userIdCreated
  }

//   async updateUser(id: number, data: Partial<User>) {
//     return this.userRepository.update(id, data);
//   }

//   async deleteUser(id: number) {
//     return this.userRepository.delete(id);
//   }
}
