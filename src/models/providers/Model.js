const Database = require('./Database')

class Model extends Database {
  constructor() {
    super()
  }
  /**
   *
   * @param {string} sql
   */
  query(sql) {
    const connection = this.connect()
    return connection.query(sql)
  }
  /**
   *
   * @param {{sql: string; params?: any[]}} sqlOptions
   */
  execute(sqlOptions) {
    const connection = this.connect()
    return connection.execute(sqlOptions.sql, sqlOptions.params)
  }
}

module.exports = Model
