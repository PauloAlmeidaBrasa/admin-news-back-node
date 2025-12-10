
export abstract class BaseService<T> {
  protected tableName: string;
  protected db: any;

  constructor(tableName: string, db: any) {
    this.tableName = tableName;
    this.db = db;
  }

  protected handleError(error: any, action: string) {
    console.error(`[Repository Error] ${this.tableName}.${action}:`, error);

    const customError: any = new Error(`Failed to ${action}`);
    customError.code = 'REPOSITORY_ERROR'
    customError.status = 500;

    throw customError;
  }
}
