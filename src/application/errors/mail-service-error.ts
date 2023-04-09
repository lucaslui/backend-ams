export class EmailInvalidError extends Error implements Error {
  constructor () {
    super('Email invalid error')
    this.name = 'EmailInvalidError'
  }
}
