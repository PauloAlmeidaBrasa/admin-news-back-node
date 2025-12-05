const generalUtils = {
  parseEmail(email: string): boolean {
    if(!email) {
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
       return false
    }
    return true  
  }

}

export default generalUtils;