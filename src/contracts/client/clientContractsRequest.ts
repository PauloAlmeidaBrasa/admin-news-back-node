export interface CreateClientRequest {
  name: string;
  address: string
}
export interface GetClientByIdResponse {
  success: boolean;
  data: {
    name: string,
    address: string
  }
}
