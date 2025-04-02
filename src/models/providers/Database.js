const { database } = require('../../configs')

class Database {
  constructor() {
    this.connection = null
  }
  connect() {
    if (!this.connection) {
      this.connection = database.connect()
    }
    return this.connection
  }
}

module.exports = Database
