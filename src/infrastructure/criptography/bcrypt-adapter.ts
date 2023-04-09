
import { IHashComparer } from '@/src/usecases/boundaries/output/criptography/hash-comparer'
import { IHasher } from '@/src/usecases/boundaries/output/criptography/hasher'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements IHasher, IHashComparer {
  constructor (private readonly salt: number) { }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
