
export abstract class BaseRepository<T> {
  protected tableName: string;
  protected db: any;

  constructor(tableName: string, db: any) {
    this.tableName = tableName;
    this.db = db;
  }

  async findAll(clientId:number) {
    try {
      return await this.db(this.tableName).select("*").where({client_id: clientId});
    } catch (error) {
      throw this.handleError(error, "findAll");
    }
  }

  async findById(id: number) {
    try {
      return await this.db(this.tableName).where({ id }).first();
    } catch (error) {
      throw this.handleError(error, "findById");
    }
  }

  async create(data: Object) {
    try {
      return this.db(this.tableName).insert(data).returning("*");
    } catch (error) {
      throw this.handleError(error, "findById");
    }
  }

  async update(id: number, payload: Partial<T>) {
    try {

      await this.db(this.tableName).where({ id }).update(payload);
     
      let updated = await this.findById(id);
      if (!updated) {
        throw new Error(`Record not found for ID=${id}`);
      }
      return updated;
    } catch (error) {
      throw this.handleError(error, "update");
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.db(this.tableName).where({ id }).delete();
    } catch (error) {
      throw this.handleError(error, "delete");
    }
  }

  protected handleError(error: any, action: string) {
    console.error(`[Repository Error] ${this.tableName}.${action}:`, error);

    const customError: any = new Error(`Failed to ${action}`);
    customError.code = 'REPOSITORY_ERROR'
    customError.status = 500;

    throw customError;
  }
}
