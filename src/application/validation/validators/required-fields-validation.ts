import { MissingParamError } from '../../errors'
import { IValidation } from '../../protocols'

export class RequiredFieldsValidation implements IValidation {
  constructor (private readonly fieldName: string) { }

  validate (input: any): Error {
    if (input[this.fieldName] === undefined) {
      return new MissingParamError(this.fieldName)
    }
  }
}
