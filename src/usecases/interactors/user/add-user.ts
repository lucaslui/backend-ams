import { EmailInUseError } from '@/src/application/errors'
import { EmailInvalidError } from '@/src/application/errors/mail-service-error'
import { left, right } from '@/src/shared/either'
import { IAddUser, AddUserParams, AddUserReturn } from '../../boundaries/input/user/add-user'
import { IHasher } from '../../boundaries/output/criptography/hasher'
import { SendEmailService } from '../../boundaries/output/gateways/email/send-email-service'
import { RandomPasswordGenerator } from '../../boundaries/output/generators/random-password-generator'
import { IAddUserRepository } from '../../boundaries/output/repositories/user/add-user-repository'
import { ILoadUserByEmailRepository } from '../../boundaries/output/repositories/user/load-user-by-email-repository'

export class AddUser implements IAddUser {
  constructor (
    private readonly userRepository: ILoadUserByEmailRepository & IAddUserRepository,
    private readonly hasher: IHasher,
    private readonly randomPasswordGenerator: RandomPasswordGenerator,
    private readonly mailService: SendEmailService
  ) {}

  async add (params: AddUserParams): Promise<AddUserReturn> {
    const isEmailInUse = await this.userRepository.loadByEmail(params.email)

    if (isEmailInUse) {
      return left(new EmailInUseError())
    }

    const randomPasswordGenerated = await this.randomPasswordGenerator.generate()

    const hashedPassword = await this.hasher.hash(randomPasswordGenerated)

    const user = await this.userRepository.add({
      name: params.name,
      email: params.email,
      role: params.role,
      password: hashedPassword,
      companyId: params.companyId
    })

    const options = {
      from: 'Lucas Lui Motta <lucasluimotta@gmail.com>',
      to: `${user.name} <${user.email}>`,
      subject: 'Convite para accessar o Sistema de Gestão da Manuntenção!',
      text: 'Estou muito contente de ter você por aqui! Esse é o começo de uma comunidade de desenvolvimento de software de excelência. \n \n' +
      'Conto contigo para construirmos a melhor plataforma de treinamento de desenvolvedores do Brasil. \n \n' +
      'Enquanto isso, fique com esse pequeno presente que preparamos para você com muito carinho: um pôster da Clean Architecture! \n \n' +
      'Espero que você curte... \n \n' +
      'Um abraço e até a próxima, \n' +
      'Lucas Lui Motta | Industria Freios Supremos',
      html: 'Estou muito contente de ter você por aqui! Esse é o começo de uma <b>comunidade de desenvolvimento de software de excelência</b>. <br> <br>' +
      'Conto contigo para construirmos <i>a melhor plataforma de treinamento de desenvolvedores do Brasil</i>. <br> <br>' +
      'Enquanto isso, fique com esse pequeno presente que preparamos para você com muito carinho: um pôster da <b>Clean Architecture</b>! <br> <br>' +
      'Tenho certeza que você vai curtir! <br> <br>' +
      'Um abraço e até a próxima, <br>' +
      '<b>Lucas Lui Motta | Industria Freios Supremos</b> <br> <br> '
    }

    const sent = await this.mailService.send(options)

    if (sent.isLeft()) {
      return left(new EmailInvalidError())
    }

    return right(user)
  }
}
