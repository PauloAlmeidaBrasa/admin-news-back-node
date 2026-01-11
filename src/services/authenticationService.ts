import bcrypt from "bcrypt";
import { UserRepository } from "@repositories/UserRepository";
import { signJwt } from "@utils/jwt";
import { JwtUserPayload, JwtUserResponse } from "@contracts/jwt";

export class AuthenticationService  {

  // constructor(private userRepository: UserRepository) {  }

  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

    
  async authentication(payload:JwtUserPayload): Promise<JwtUserResponse> {

    const user = await this.userRepository.findByEmail(payload.email)
    
    if (!user)
    {
      const customError: any = new Error(`Record not found for email= ${payload.email}`);
      customError.status = 404;

      throw customError;
    }

    const passwordMatch = await bcrypt.compare(String(payload.password), String(user.password))
    if (!passwordMatch) {
      const customError: any = new Error(`Invalid Credentials`);
      customError.status = 404;

      throw customError;
    }

    const token = signJwt({
      id: user.id,
      name: user.name,
      client_id: user.client_id,
      email: user.email
    });

    return {
      access_token: token,
      expiresIn: '3d',
      user: {
        id: user.id,
        email: user.email,
      }
    };
  }

}

// export const authService = new AuthenticationService(UserRepository);
