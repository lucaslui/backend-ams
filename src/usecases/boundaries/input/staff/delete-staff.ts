import { Either } from '@/src/shared/either'

export type DeleteStaffParams = {
  staffId: string
}

export type DeleteStaffReturn = Either<Error, void>

export interface IDeleteStaff {
  delete (params: DeleteStaffParams): Promise<DeleteStaffReturn>
}
