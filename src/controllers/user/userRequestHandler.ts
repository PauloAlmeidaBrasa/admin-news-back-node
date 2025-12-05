import { string } from "zod";
import generalUtils from "@utils/generalUtils";

export class UserRequestHandler {
  static validateToGetById(id: string): UserValidateResponse {

    if(!id) { return { error: true, message: 'id missing'} }
    if(!Number(id)) { return { error: true, message: 'id bad format'} }

    return { error: false, message: ''}

  }

  static validateToCreate(params: UserReqStore): UserValidateResponse{

    if(!params.name || !string(params.name) ) {
      return { error: true, message: 'name missing'}
    }
    if (!params.email) {
      return { error: true, message: 'email missing'}
    }
    if(!generalUtils.parseEmail(params.email)) {
      return { error: true, message: 'email bad format'}
    }
    if (!params.password) {
      return { error: true, message: 'password missing'}
    }

    return { error: false, message: ''}
  }
}


export interface UserReqStore {
  // id: number;
  name: string;
  email: string;
  password: string;
  // created_at?: Date;
}

export interface UserValidateResponse {
  error: boolean,
  message: string
}