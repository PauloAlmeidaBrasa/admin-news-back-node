// src/modules/user/user.service.ts
import bcrypt from "bcrypt";
import { UserRepository } from "@repositories/UserRepository";
import { User } from "@models/UserModel";

export class UserService {

  constructor(private userRepository: UserRepository) {}

  // private userRepository = new UserRepository();

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  async createUser(data: Partial<User>) {
    const existing = await this.userRepository.findByEmail(data.email!);
    if (existing) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(data.password!, 10);

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
