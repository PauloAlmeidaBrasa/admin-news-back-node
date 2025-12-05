// src/modules/user/user.service.ts
import bcrypt from "bcrypt";
import { UserRepository } from "@repositories/UserRepository";
import { User } from "@models/UserModel";
import { GetByIdDTO, CreateDTO } from "contracts/user/userContractsDTO"
import { CreateUseRequest} from "contracts/user/userContractsRequest";

export class UserService {

  constructor(private userRepository: UserRepository) {}

  // private userRepository = new UserRepository();

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<GetByIdDTO> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  async createUser(data: CreateUseRequest): Promise<CreateDTO> {
    const existing = await this.userRepository.findByEmail(data.email!);
    if (existing) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userData = { ...data, password: hashedPassword };

    return this.userRepository.create(userData);
  }

//   async updateUser(id: number, data: Partial<User>) {
//     return this.userRepository.update(id, data);
//   }

//   async deleteUser(id: number) {
//     return this.userRepository.delete(id);
//   }
}
