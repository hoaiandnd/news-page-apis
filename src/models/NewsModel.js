const ResultModel = require('./providers/ResultModel')

class NewsModel extends ResultModel {
  constructor() {
    super()
    this.connect()
  }
  /**
   *
   * @param {{limit?: number | string; offset?: number | string}} paginationOptions
   * @returns
   */
  getNewsList({ limit = 0, offset }) {
    const newsSelectSql = 'SELECT * FROM users'
    const paginationSql = +limit > 0 ? `${newsSelectSql} LIMIT ? OFFSET ?` : newsSelectSql
    return this.executeResult({ sql: paginationSql, params: [limit + '', offset + '' || '0'] })
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
