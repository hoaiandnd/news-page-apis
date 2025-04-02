import process from 'dotenv'
process.config()

export const database = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  port: process.env.DB_PORT || 3306
}

export const appPort = process.env.APP_PORT || 3000
