import validator from 'validator'

import { IEmailValidator } from '@/src/application/validation/protocols/email-validator'

export class EmailValidatorAdapter implements IEmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
