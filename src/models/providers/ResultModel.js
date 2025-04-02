const Model = require('./Model')

class ResultModel extends Model {
  constructor() {
    super()
  }
  /**
   *
   * @param {string} sql
   */
  async queryResult(sql) {
    return this.query(sql).then(([row]) => row)
  }
  /**
   *
   * @param {{sql: string; values?: any[]}} sqlOptions
   */
  async executeResult(sqlOptions) {
    return this.execute(sqlOptions).then(([result]) => result)
  }
}

module.exports = ResultModel
