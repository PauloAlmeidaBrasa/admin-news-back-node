import { User } from "@models/UserModel";
import db from "@config/db"

export class UserRepository {
  async findAll(): Promise<User[]> {
    return db<User>("users").select("*");
  }

  async findById(id: number): Promise<User | undefined> {
    return db<User>("users").where({ id }).first();
  }

  async create(data: Partial<User>): Promise<User> {
    const [user] = await db<User>("users").insert(data).returning("*");
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return db<User>("users").where({ email }).first();
  }
}