export interface GetAllDTO {
  id: number
  name: string
  address: string
  createdAt: Date
}
export interface GetByIdDTO {
  id: number
  name: string
  address: string
}
export interface CreateDTO {
  name: string;
  address: string;
}
export interface ClientDTO {
  name: string,
  address: string
}