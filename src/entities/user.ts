export type UserModel = {
  id: string
  name: string
  email: string
  password?: string
  role: Role
  companyId: string
  updatedAt: Date
  createdAt: Date
}

export type UserAccountModel = {
  accessToken: string
  companyId: string
}

export type Role = 'admin' | 'operator' | 'guest'
