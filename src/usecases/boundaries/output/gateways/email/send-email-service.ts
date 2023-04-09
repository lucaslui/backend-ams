import { EmailInvalidError } from '@/src/application/errors/mail-service-error'
import { Either } from '@/src/shared/either'

export type SendEmailServiceParams = {
  from: string
  to: string
  subject: string
  text: string
  html: string
}

export type SendEmailServiceReturn = Either<EmailInvalidError, boolean>

export interface SendEmailService {
  send (options: SendEmailServiceParams): Promise<SendEmailServiceReturn>
}
