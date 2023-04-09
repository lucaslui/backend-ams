import { UserModel } from '@/src/entities/user'

export interface ILoadUserByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<UserModel>
}
