
export interface JwtUserPayload {
  email: string;
  password: string;
}

export interface JwtUserResponse {
  access_token: string;
  expiresIn: string
  user: {
    id: number,
    email: string
  }
}
export type JwtTokenPayload = {
  id: number;
  name: string;
  client_id: number;
  email?: string;
  token?: string
};


declare global {
  namespace Express {
    interface Request {
      user: JwtTokenPayload;
    }
  }
}