export interface JwtUserSession {
  id: number;
  name: string;
  clientId: number;
  token: string
}
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


declare global {
  namespace Express {
    interface Request {
      user?: JwtUserSession;
    }
  }
}