
export abstract class BaseRepository<T> {
  protected tableName: string;
  protected db: any;

  constructor(tableName: string, db: any) {
    this.tableName = tableName;
    this.db = db;
  }

  async findAll(clientId:number) {
    try {
      return await this.db(this.tableName).select("*").where({id: clientId});
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

        const customError: any = new Error(`Record not found for ID=${id}`);
        customError.message = customError.message;
        customError.status = 404;
        customError.code = 'USERNOTFOUND';

        throw customError;
      }
      return updated;
    } catch (error: any) {
      throw this.handleError(error, "update");
    }
  }

  async delete(id: number): Promise<void> {
    try {
     
      let user = await this.findById(id);
      if (!user) {

        const customError: any = new Error(`Record not found for ID=${id}`);
        customError.message = customError.message;
        customError.status = 404;
        customError.code = 'USERNOTFOUND';

        throw customError;
      }
      await this.db(this.tableName).where({ id }).delete();
    } catch (error) {
      throw this.handleError(error, "delete");
    }
  }

  protected handleError(error: any, action: string) {
    console.error(`[Repository Error] ${this.tableName}.${action}:`, error);

    const customError: any = new Error(`Failed to ${action}`);
    customError.code = error.code || "REPOSITORY_ERROR";
    customError.status = error.status || 500;
    customError.message = error.message;


    throw customError;
  }
}
