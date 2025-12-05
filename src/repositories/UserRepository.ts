import { User } from "@models/UserModel";
import db from "@config/db"
import { GetByIdDTO, CreateDTO } from "contracts/user/userContractsDTO";

export class UserRepository {
  async findAll(): Promise<User[]> {
    return db<User>("users").select("*");
  }

  async findById(id: number): Promise<GetByIdDTO | undefined> {
    return db<User>("users")
      .select("id", "name", "email", "access_level")
      .where({ id })
      .first();
  }

  async create(data: Partial<User>): Promise<CreateDTO> {
    const [user] = await db<User>("users").insert(data).returning("*");
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return db<User>("users").where({ email }).first();
  }
}