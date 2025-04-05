const database = require('../../configs/database.config')

class Database {
  constructor() {
    this.connection = null
  }
  connect() {
    this.connection ??= database.connect()
    return this.connection
  }
}

module.exports = Database
