export interface IDeleteCompanyRepository {
  delete (companyId: string): Promise<void>
}
