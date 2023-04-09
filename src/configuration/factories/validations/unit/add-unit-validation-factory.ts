import { IValidation } from '../../../../application/protocols/validation'
import { ValidationComposite } from '../../../../application/validation/composites/validation-composite'
import { RequiredFieldsValidation } from '../../../../application/validation/validators'

export const makeAddUnitValidation = (): ValidationComposite => {
  const validations: IValidation[] = []

  for (const field of ['name', 'address']) {
    validations.push(new RequiredFieldsValidation(field))
  }

  return new ValidationComposite(validations)
}
