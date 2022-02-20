export class usrRegisterError extends Error {
  constructor(message, shortHand) {
    super(message);
    this.name = 'RergisterError';
    this.code = shortHand;
  }
}
