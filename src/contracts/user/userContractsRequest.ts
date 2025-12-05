export interface CreateUseRequest {
  name: string;
  email: string;
  password: string;
  client_id?: number

}
export interface CreateUserResponse {
  success: boolean;
  message: string;
}
export interface GetUserByIdResponse {
  success: boolean;
  data: {
    name: string,
    email: string,
    accessLevel: number,
    clientId: number
  }
}
