// modules/auth/login.service.ts
import bcrypt from "bcrypt";
import { UserRepository } from "@repositories/UserRepository";
import { signJwt } from "@utils/jwt";
import { JwtUserPayload, JwtUserResponse } from "@contracts/jwt";

export class AuthenticationService  {

  constructor(private userRepository: UserRepository) {  }

    
  async authentication(payload:JwtUserPayload):Promise<JwtUserResponse> {

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
      email: user.email,
      password: payload.password
    });

    return {
      access_token: token,
      expiresIn: '1d',
      user: {
        id: user.id,
        email: user.email,
      }
    };
  }



    // if (!user) console.log('ERRORR')


  //   const passwordMatch = await bcrypt.compare(password, user.password);
  //   if (!passwordMatch) throw new Error("Invalid credentials");

  //   const token = signJwt({
  //     email: user.email,
  //     password: password
  //   });

  //   return {
  //     access_token: token,
  //     user: {
  //       id: user.id,
  //       email: user.email,
  //     }
  //   };
  // }
}

// export const authService = new AuthenticationService(UserRepository);
