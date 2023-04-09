import { IValidation } from '@/src/application/protocols'
import { ValidationComposite } from '@/src/application/validation/composites/validation-composite'
import { RequiredFieldsValidation } from '@/src/application/validation/validators'
import { EmailValidation } from '@/src/application/validation/validators/email-validation'
import { EmailValidatorAdapter } from '@/src/infrastructure/validators/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: IValidation[] = []

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldsValidation(field))
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
