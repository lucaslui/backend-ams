import { UserModel } from '@/src/entities/user'

export interface ILoadUserByEmailRepository {
  loadByEmail: (email: string) => Promise<UserModel>
}
