const ResultModel = require('./providers/ResultModel')

class NewsModel extends ResultModel {
  constructor() {
    super()
    this.connect()
  }
  getAllNews() {
    return this.queryResult('SELECT * FROM users')
  }
  /**
   * @param {string | number} id
   */
  getNewById(id) {
    return this.executeOne({
      sql: 'SELECT * FROM users WHERE id = ?',
      params: [id]
    })
  }
}

module.exports = NewsModel
