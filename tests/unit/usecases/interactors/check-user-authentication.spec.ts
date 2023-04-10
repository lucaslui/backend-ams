
import { IEncrypter } from '@/src/usecases/boundaries/output/criptography/encrypter'
import { IHashComparer } from '@/src/usecases/boundaries/output/criptography/hash-comparer'
import { ILoadUserByEmailRepository } from '@/src/usecases/boundaries/output/repositories/user/load-user-by-email-repository'
import { IUpdateAccessTokenRepository } from '@/src/usecases/boundaries/output/repositories/user/update-access-token-repository'
import { Role, UserModel } from '@/src/entities/user'
import { CheckUserAuthentication } from '@/src/usecases/interactors/auth/check-user-authentication'
import { CheckUserAuthenticationParams } from '@/src/usecases/boundaries/input/auth/check-user-authentication'
import { left, right } from '@/src/shared/either'
import { UnauthorizedError } from '@/src/application/errors'

const throwError = (): never => {
  throw new Error()
}

const mockParams = (): CheckUserAuthenticationParams => ({
  email: 'any_email',
  password: 'any_password'
})

type SutTypes = {
  sut: CheckUserAuthentication
  loadUserByEmailRepository: LoadUserByEmailRepositoryStub
  hashComparer: IHashComparer
  encrypter: IEncrypter
  updateAccessTokenRepository: IUpdateAccessTokenRepository
}

export class LoadUserByEmailRepositoryStub implements ILoadUserByEmailRepository {
  email: string
  async loadByEmail (email: string): Promise<UserModel> {
    this.email = email
    const user = {
      id: 'any_id',
      name: 'any_name',
      email,
      password: 'any_password',
      role: 'admin' as Role,
      companyId: 'any_company_id',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return user
  }
}

export class HashComparerStub implements IHashComparer {
  async compare (value: string, hash: string): Promise<boolean> {
    return true
  }
}

export class EncrypterStub implements IEncrypter {
  async encrypt (value: string): Promise<string> {
    return 'any_token'
  }
}

export class UpdateAccessTokenRepositoryStub implements IUpdateAccessTokenRepository {
  async updateAccessToken (id: string, token: string): Promise<void> {
    return Promise.resolve()
  }
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepository = new LoadUserByEmailRepositoryStub()
  const hashComparer = new HashComparerStub()
  const encrypter = new EncrypterStub()
  const updateAccessTokenRepository = new UpdateAccessTokenRepositoryStub()
  const sut = new CheckUserAuthentication(loadUserByEmailRepository, hashComparer, encrypter, updateAccessTokenRepository)
  return {
    sut,
    loadUserByEmailRepository,
    hashComparer,
    encrypter,
    updateAccessTokenRepository
  }
}

describe('CheckUserAuthentication Usecase', () => {
  test('Should return token on success', async () => {
    const { sut } = makeSut()
    const result = await sut.auth(mockParams())
    expect(result).toEqual(right({ accessToken: 'any_token', companyId: 'any_company_id' }))
  })

  test('Should return unauthorized error if email is not found', async () => {
    const { sut, loadUserByEmailRepository } = makeSut()
    jest.spyOn(loadUserByEmailRepository, 'loadByEmail').mockImplementationOnce(async () => Promise.resolve(null))
    const result = await sut.auth(mockParams())
    expect(result).toEqual(left(new UnauthorizedError()))
  })

  test('Should return unauthorized error if hash compare fails', async () => {
    const { sut, hashComparer } = makeSut()
    jest.spyOn(hashComparer, 'compare').mockImplementationOnce(async () => Promise.resolve(false))
    const result = await sut.auth(mockParams())
    expect(result).toEqual(left(new UnauthorizedError()))
  })

  test('Should call loadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepository } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadUserByEmailRepository, 'loadByEmail')
    await sut.auth(mockParams())
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email')
  })

  test('Should call hashComparer with correct values', async () => {
    const { sut, hashComparer } = makeSut()
    const compareSpy = jest.spyOn(hashComparer, 'compare')
    await sut.auth(mockParams())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'any_password')
  })

  test('Should call encrypter with correct id', async () => {
    const { sut, encrypter } = makeSut()
    const encryptSpy = jest.spyOn(encrypter, 'encrypt')
    await sut.auth(mockParams())
    expect(encryptSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should call updateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepository } = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepository, 'updateAccessToken')
    await sut.auth(mockParams())
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('Should throw if loadUserByEmailRepository throws', async () => {
    const { sut, loadUserByEmailRepository } = makeSut()
    jest.spyOn(loadUserByEmailRepository, 'loadByEmail').mockImplementationOnce(throwError)
    const promise = sut.auth(mockParams())
    await expect(promise).rejects.toThrow()
  })
})
