import { string } from "zod";
import generalUtils from "@utils/generalUtils";

export class CategoryRequestHandler {
  static validateToGetById(id: string): UserValidateResponse {

    if(!id) { return { error: true, message: 'id missing'} }
    if(!Number(id)) { return { error: true, message: 'id bad format'} }

    return { error: false, message: ''}

  }

  static validateToCreate(params: UserReqStore): UserValidateResponse{

    if((!params) || !string(params.name) ) {
      return { error: true, message: 'name missing'}
    }

    return { error: false, message: ''}
  }
  static validateToUpdate(id: string): UserValidateResponse {

    if(!id) { return { error: true, message: 'id missing'} }
    // if(!Number(id)) { return { error: true, message: 'id bad format'} }

    return { error: false, message: ''}

  }
    static validateToDelete(id: string): UserValidateResponse {

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

export interface UserValidateResponse {
  error: boolean,
  message: string
}