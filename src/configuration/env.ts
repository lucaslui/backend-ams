export default {
  host: process.env.HOST,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  mongoUrl: process.env.MONGO_URL,
  gmailUser: process.env.GMAIL_USER,
  gmailAppPassword: process.env.GMAIL_APP_PASSWORD
}
