import { CompanyMongoRepository } from '@/src/infrastructure/repositories/mongodb/company-mongo-repository'
import { BcryptAdapter } from '@/src/infrastructure/criptography/bcrypt-adapter'
import { NodemailerEmailService } from '@/src/infrastructure/gateways/email/nodemailer-email-service'
import { UserMongoRepository } from '@/src/infrastructure/repositories/mongodb/user-mongo-repository'
import { FakerRandomGenerator } from '@/src/infrastructure/generators/faker-random-generator'
import { IAddCompanyUser } from '@/src/usecases/boundaries/input/company/add-company-user'
import { AddCompanyUser } from '@/src/usecases/interactors/company/add-company-user'

import env from '@/src/configuration/env'

export const makeAddCompanyUser = (): IAddCompanyUser => {
  const companyMongoRepository = new CompanyMongoRepository()
  const userMongoRepository = new UserMongoRepository()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const mailCredentials = { username: env.gmailUser, password: env.gmailAppPassword }
  const mailService = new NodemailerEmailService(mailCredentials)
  const randomPasswordGenerator = new FakerRandomGenerator()
  return new AddCompanyUser(companyMongoRepository, userMongoRepository, bcryptAdapter, randomPasswordGenerator, mailService)
}
