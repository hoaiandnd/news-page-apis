const { database } = require('../utils')
const mysql = require('mysql2/promise')

const connect = () => {
  const connection = mysql.createPool({ ...database, waitForConnections: true, connectionLimit: 10 })
  return connection
}

module.exports = { connect }
