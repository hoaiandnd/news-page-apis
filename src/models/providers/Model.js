const Database = require('./Database')

class Model extends Database {
  constructor() {
    super()
  }
  /**
   *
   * @param {string} sql
   */
  async query(sql) {
    const connection = this.connect()
    return connection.query(sql)
  }
  /**
   *
   * @param {{sql: string; values?: any[]}} sqlOptions
   */
  execute(sqlOptions) {
    const connection = this.connect()
    return connection.execute(sqlOptions.sql, sqlOptions.values)
  }
}

module.exports = Model
