// import { User } from "@contracts/user/userContractsDTO";
import db from "@config/db"
import { GetByIdDTO, CreateDTO, GetAllDTO } from "contracts/user/userContractsDTO";

export class UserRepository {
  async findAll(clientId: number): Promise<GetAllDTO[]> {
    const query = db<GetAllDTO>("users").select("*")

    return query.where('client_id',clientId)
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