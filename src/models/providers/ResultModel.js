const Model = require('./Model')

class ResultModel extends Model {
  constructor() {
    super()
  }
  /**
   *
   * @param {string} sql
   */
  queryResult(sql) {
    return this.query(sql).then(([row]) => row)
  }
  async queryOne(sql) {
    return this.query(sql).then(([row]) => row?.[0])
  }
  /**
   *
   * @param {{sql: string; params?: any[]}} sqlOptions
   */
  async executeResult(sqlOptions) {
    return this.execute(sqlOptions).then(([result]) => result)
  }
  /**
   *
   * @param {{sql: string; params?: any[]}} sqlOptions
   */
  async executeOne(sqlOptions) {
    return this.execute(sqlOptions).then(([result]) => result?.[0])
  }
}

module.exports = ResultModel
