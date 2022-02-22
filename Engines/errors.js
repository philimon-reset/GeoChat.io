export class usrRegisterError extends Error {
  constructor(message, shortHand) {
    super(message);
    this.code = shortHand;
  }
}

export class loginError extends Error {
  constructor(message, shortHand) {
    super(message);
    this.code = shortHand;
  }
}
