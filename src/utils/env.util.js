require('dotenv').config()

const database = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  port: process.env.DB_PORT || 3306
}

const appPort = process.env.APP_PORT || 3000

module.exports = { database, appPort }
