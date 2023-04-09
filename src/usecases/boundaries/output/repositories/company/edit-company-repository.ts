import { CompanyModel } from '@/src/entities/company'
import { EditCompanyParams } from '../../../input/company/edit-company'

export interface IEditCompanyRepository {
  edit (params: EditCompanyParams, companyId: string): Promise<CompanyModel>
}
