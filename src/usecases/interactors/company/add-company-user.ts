import { EmailInUseError } from '@/src/application/errors'
import { EmailInvalidError } from '@/src/application/errors/mail-service-error'
import { left, right } from '@/src/shared/either'
import { IHasher } from '../../boundaries/output/criptography/hasher'
import { SendEmailService } from '../../boundaries/output/gateways/email/send-email-service'
import { RandomPasswordGenerator } from '../../boundaries/output/generators/random-password-generator'
import { IAddUserRepository } from '../../boundaries/output/repositories/user/add-user-repository'
import { ILoadUserByEmailRepository } from '../../boundaries/output/repositories/user/load-user-by-email-repository'
import { AddCompanyUserParams, AddCompanyUserReturn, IAddCompanyUser } from '../../boundaries/input/company/add-company-user'
import { ILoadCompanyByIdRepository } from '../../boundaries/output/repositories/company/load-company-by-id-repository'

export class AddCompanyUser implements IAddCompanyUser {
  constructor (
    private readonly companiesRepository: ILoadCompanyByIdRepository,
    private readonly userRepository: ILoadUserByEmailRepository & IAddUserRepository,
    private readonly hasher: IHasher,
    private readonly randomPasswordGenerator: RandomPasswordGenerator,
    private readonly mailService: SendEmailService
  ) { }

  async add (params: AddCompanyUserParams): Promise<AddCompanyUserReturn> {
    const company = await this.companiesRepository.loadById(params.companyId)

    if (!company) {
      return left(new Error('Company not found'))
    }

    const isEmailInUse = await this.userRepository.loadByEmail(params.email)

    if (isEmailInUse) {
      return left(new EmailInUseError())
    }

    const randomPasswordGenerated = await this.randomPasswordGenerator.generate()

    const hashedPassword = await this.hasher.hash(randomPasswordGenerated)

    const user = await this.userRepository.add({
      name: params.name,
      email: params.email,
      role: 'admin',
      password: hashedPassword,
      companyId: company.id
    })

    const options = {
      from: 'Lucas Lui Motta <lucasluimotta@gmail.com>',
      to: `${user.name} <${user.email}>`,
      subject: 'Bem vindo ao Sistema de Gestão da Manuntenção da Tractian!',
      text: `Olá ${user.name}! \n \n` +
      `Você foi escolhido como usuário administrador da ${company.name}. \n \n` +
      'A partir de agora você pode entrar na plataforma e gerenciar novos usuários. \n \n' +
      `Sua senha temporária é ${randomPasswordGenerated}. \n \n` +
      'Atencisamente, \n' +
      'Lucas Lui Motta \n' +
      'Suporte da Tractian',
      html: `Olá <b>${user.name}</b>! <br> <br>` +
      `Você foi escolhido como usuário administrador da <b>${company.name}</b>. <br> <br>` +
      'A partir de agora você pode entrar na plataforma e gerenciar novos usuários. <br> <br>' +
      `Sua senha temporária é <b>${randomPasswordGenerated}</b>. <br> <br>` +
      'Atenciosamente, <br>' +
      'Lucas Lui Motta <br>' +
      'Suporte da Tractian'
    }

    const sent = await this.mailService.send(options)

    if (sent.isLeft()) {
      return left(new EmailInvalidError())
    }

    return right(undefined)
  }
}
