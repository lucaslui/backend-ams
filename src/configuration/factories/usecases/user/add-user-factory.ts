import { BcryptAdapter } from '@/src/infrastructure/criptography/bcrypt-adapter'
import { NodemailerEmailService } from '@/src/infrastructure/gateways/email/nodemailer-email-service'
import { UserMongoRepository } from '@/src/infrastructure/repositories/mongodb/user-mongo-repository'
import { IAddUser } from '@/src/usecases/boundaries/input/user/add-user'
import { AddUser } from '@/src/usecases/interactors/user/add-user'
import { FakerRandomGenerator } from '@/src/infrastructure/generators/faker-random-generator'

import env from '@/src/configuration/env'

export const makeAddUser = (): IAddUser => {
  const userMongoRepository = new UserMongoRepository()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const mailCredentials = { username: env.gmailUser, password: env.gmailAppPassword }
  const mailService = new NodemailerEmailService(mailCredentials)
  const randomPasswordGenerator = new FakerRandomGenerator()

  return new AddUser(userMongoRepository, bcryptAdapter, randomPasswordGenerator, mailService)
}
