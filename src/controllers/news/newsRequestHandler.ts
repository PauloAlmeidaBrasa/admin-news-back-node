export class NewsRequestHandler {
  static validateToGetById(id: string): validateResponse {
    console.log('123')
    if (!id) {
      return { error: true, message: "id missing" };
    }
    if (!Number(id)) {
      return { error: true, message: "id bad format" };
    }
    return { error: false, message: "" };
  }

  static validateToCreate(params: NewsReqStore): validateResponse {
    console.log(params)
    if (!params || !params.title) {
      return { error: true, message: "title missing" };
    }
    if (!params.category_id) {
      return { error: true, message: "category_id missing" };
    }
    return { error: false, message: "" };
  }

  static validateToUpdate(id: string, body: Object): validateResponse {
    if (!id) {
      return { error: true, message: "id missing" };
    }
    if (!body) {
      return { error: true, message: "body missing" };
    }
    return { error: false, message: "" };
  }

  static validateToDelete(id: string): validateResponse {
    if (!id) {
      return { error: true, message: "id missing" };
    }
    return { error: false, message: "" };
  }
}

export interface NewsReqStore {
  title: string;
  subtitle?: string;
  text?: string;
  category_id: number;
}

export interface validateResponse {
  error: boolean;
  message: string;
}