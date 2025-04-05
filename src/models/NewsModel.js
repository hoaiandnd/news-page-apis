const { ResultModel } = require('./providers')

class NewsModel extends ResultModel {
  constructor() {
    super()
    this.connect()
  }
  getAllNews() {
    return this.queryResult('SELECT * FROM news')
  }
  /**
   * @param {string | number} id
   */
  getNewById(id) {
    return this.executeResult({
      sql: 'SELECT * FROM news WHERE id = ?',
      params: [id]
    })
  }
}

module.exports = NewsModel
