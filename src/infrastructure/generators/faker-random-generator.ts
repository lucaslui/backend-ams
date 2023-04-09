import { faker } from '@faker-js/faker'

import { RandomPasswordGenerator } from '@/src/usecases/boundaries/output/generators/random-password-generator'

export class FakerRandomGenerator implements RandomPasswordGenerator {
  async generate (): Promise<string> {
    return faker.internet.password()
  }
}
