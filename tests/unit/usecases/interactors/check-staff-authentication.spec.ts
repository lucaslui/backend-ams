
import { IEncrypter } from '@/src/usecases/boundaries/output/criptography/encrypter'
import { IHashComparer } from '@/src/usecases/boundaries/output/criptography/hash-comparer'
import { ILoadStaffByEmailRepository } from '@/src/usecases/boundaries/output/repositories/staff/load-staff-by-email-repository'
import { IUpdateAccessTokenRepository } from '@/src/usecases/boundaries/output/repositories/user/update-access-token-repository'
import { StaffModel } from '@/src/entities/staff'
import { CheckStaffAuthentication } from '@/src/usecases/interactors/auth/check-staff-authentication'
import { CheckStaffAuthenticationParams } from '@/src/usecases/boundaries/input/auth/check-staff-authentication'
import { left, right } from '@/src/shared/either'
import { UnauthorizedError } from '@/src/application/errors'

const throwError = (): never => {
  throw new Error()
}

const mockParams = (): CheckStaffAuthenticationParams => ({
  email: 'any_email',
  password: 'any_password'
})

type SutTypes = {
  sut: CheckStaffAuthentication
  loadStaffByEmailRepository: LoadStaffByEmailRepositoryStub
  hashComparer: IHashComparer
  encrypter: IEncrypter
  updateAccessTokenRepository: IUpdateAccessTokenRepository
}

export class LoadStaffByEmailRepositoryStub implements ILoadStaffByEmailRepository {
  email: string
  async loadByEmail (email: string): Promise<StaffModel> {
    this.email = email
    const staff = {
      id: 'any_id',
      name: 'any_name',
      email,
      password: 'any_password',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return staff
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
  const loadStaffByEmailRepository = new LoadStaffByEmailRepositoryStub()
  const hashComparer = new HashComparerStub()
  const encrypter = new EncrypterStub()
  const updateAccessTokenRepository = new UpdateAccessTokenRepositoryStub()
  const sut = new CheckStaffAuthentication(loadStaffByEmailRepository, hashComparer, encrypter, updateAccessTokenRepository)
  return {
    sut,
    loadStaffByEmailRepository,
    hashComparer,
    encrypter,
    updateAccessTokenRepository
  }
}

describe('CheckStaffAuthentication Usecase', () => {
  test('Should return token on success', async () => {
    const { sut } = makeSut()
    const result = await sut.auth(mockParams())
    expect(result).toEqual(right('any_token'))
  })

  test('Should return unauthorized error if email is not found', async () => {
    const { sut, loadStaffByEmailRepository } = makeSut()
    jest.spyOn(loadStaffByEmailRepository, 'loadByEmail').mockImplementationOnce(async () => Promise.resolve(null))
    const result = await sut.auth(mockParams())
    expect(result).toEqual(left(new UnauthorizedError()))
  })

  test('Should return unauthorized error if hash compare fails', async () => {
    const { sut, hashComparer } = makeSut()
    jest.spyOn(hashComparer, 'compare').mockImplementationOnce(async () => Promise.resolve(false))
    const result = await sut.auth(mockParams())
    expect(result).toEqual(left(new UnauthorizedError()))
  })

  test('Should call loadStaffByEmailRepository with correct email', async () => {
    const { sut, loadStaffByEmailRepository } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadStaffByEmailRepository, 'loadByEmail')
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

  test('Should throw if loadStaffByEmailRepository throws', async () => {
    const { sut, loadStaffByEmailRepository } = makeSut()
    jest.spyOn(loadStaffByEmailRepository, 'loadByEmail').mockImplementationOnce(throwError)
    const promise = sut.auth(mockParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if hashComparer throws', async () => {
    const { sut, hashComparer } = makeSut()
    jest.spyOn(hashComparer, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if encrypter throws', async () => {
    const { sut, encrypter } = makeSut()
    jest.spyOn(encrypter, 'encrypt').mockImplementationOnce(throwError)
    const promise = sut.auth(mockParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if updateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepository } = makeSut()
    jest.spyOn(updateAccessTokenRepository, 'updateAccessToken').mockImplementationOnce(throwError)
    const promise = sut.auth(mockParams())
    await expect(promise).rejects.toThrow()
  })
})
