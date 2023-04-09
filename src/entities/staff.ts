export interface StaffModel {
  id: string
  name: string
  email: string
  password?: string
  updatedAt: Date
  createdAt: Date
}

export type StaffAccountModel = {
  accessToken: string
}
