declare namespace Express {
  interface Request {
    userId?: string
    companyId?: string
    file?: Multer.File
  }
}
