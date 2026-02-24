import { string } from "zod";

export class CategoryRequestHandler {
  static validateToGetById(id: string): validateResponse {

    if(!id) { return { error: true, message: 'id missing'} }
    if(!Number(id)) { return { error: true, message: 'id bad format'} }

    return { error: false, message: ''}

  }

  static validateToCreate(params: UserReqStore): validateResponse{

    if((!params) || !string(params.name) ) {
      return { error: true, message: 'name missing'}
    }

    return { error: false, message: ''}
  }
  static validateToUpdate(id: string, body: Object): validateResponse {

    if(!id) { return { error: true, message: 'id missing'} }
    if(!body) { return { error: true, message: 'body missing'} }

    return { error: false, message: ''}

  }
    static validateToDelete(id: string): validateResponse {

    if(!id) { return { error: true, message: 'id missing'} }
    // if(!Number(id)) { return { error: true, message: 'id bad format'} }

    return { error: false, message: ''}

  }

}



export interface UserReqStore {
  name: string;
  email: string;
  password: string;
}

export interface validateResponse {
  error: boolean,
  message: string
}