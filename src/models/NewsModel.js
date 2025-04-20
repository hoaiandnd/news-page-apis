const PaginationResultModel = require('./providers/PaginationResultModel')

class NewsModel extends PaginationResultModel {
  constructor() {
    super()
    this.connect()
  }
  /**
   * @param {{limit?: number | string; offset?: number | string}} paginationOptions
   * @returns
   */
  getNewsList(paginationOptions) {
    return this.paginationQueryResult({ sql: 'SELECT * FROM news', ...paginationOptions })
  }
  /**
   * @param {string | number} id
   */
  getNewsById(id) {
    return this.executeOne({
      sql: 'SELECT * FROM news WHERE id = ?',
      params: [id]
    })
  }
}

module.exports = NewsModel
