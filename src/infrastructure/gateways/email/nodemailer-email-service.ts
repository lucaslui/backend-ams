import * as nodemailer from 'nodemailer'

import { SendEmailServiceParams, SendEmailService, SendEmailServiceReturn } from '@/src/usecases/boundaries/output/gateways/email/send-email-service'
import { EmailInvalidError } from '@/src/application/errors/mail-service-error'
import { left, right } from '@/src/shared/either'

export class NodemailerEmailService implements SendEmailService {
  constructor (
    private readonly credentials: {username: string, password: string}
  ) {}

  async send (options: SendEmailServiceParams): Promise<SendEmailServiceReturn> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: this.credentials.username,
          pass: this.credentials.password
        }
      })
      await transporter.sendMail({
        from: 'Lucas Lui Motta <lucasluimotta@gmail.com>',
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html
      })
    } catch (error) {
      return left(new EmailInvalidError())
    }
    return right(true)
  }
}
