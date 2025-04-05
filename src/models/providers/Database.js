const dbContext = require('../../configs/database.config')

class Database {
  constructor() {
    this.connection = null
  }
  connect() {
    this.connection ??= dbContext.connect()
    return this.connection
  }
}

module.exports = Database
