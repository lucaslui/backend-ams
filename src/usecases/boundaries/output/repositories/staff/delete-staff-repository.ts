import { DeleteStaffParams } from '../../../input/staff/delete-staff'

export interface IDeleteStaffRepository {
  delete (params: DeleteStaffParams): Promise<void>
}
