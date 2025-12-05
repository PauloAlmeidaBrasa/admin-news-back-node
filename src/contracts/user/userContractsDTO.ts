export interface GetAllDTO {
  id: number
  name: string
  email: string
  accessLevel: number
  clientId: number,
  createdAt: Date
}
export interface GetByIdDTO {
  id: number
  name: string
  email: string
  accessLevel: number
  clientId: number
}
export interface CreateDTO {
  id: number;
}