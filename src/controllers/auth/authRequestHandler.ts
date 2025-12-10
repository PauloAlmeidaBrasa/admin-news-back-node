

export class AuthRequestHandler {
  static validateAuth(email: string, password:string) {

    if(!email) { return { error: true, message: 'email missing'} }
    if(!password) { return { error: true, message: 'password missing'} }

    return { error: false, message: ''}

  }
}