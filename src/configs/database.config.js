const { databaseEnv } = require('../utils')
const mysql = require('mysql2/promise')

const connect = () => {
  const connection = mysql.createPool({ ...databaseEnv, waitForConnections: true, connectionLimit: 10 })
  return connection
}
const dbContext = { connect }
module.exports = dbContext
