const ResultModel = require('./ResultModel')

class PaginationResultModel extends ResultModel {
  constructor() {
    super()
  }
  static paginationSql = originalSourceOptions => {
    const { sql = '', params = [], limit = 0, offset = '0' } = originalSourceOptions
    const paginationSql = +limit > 0 ? `${sql} LIMIT ? OFFSET ?` : sql
    return { sql: paginationSql, params: [...params, limit + '', offset + ''] }
  }
  /**
   * @param {{sql: string; params?: any[]; limit?: string | number; offset?: string | number}} paginationSqlOptions
   */
  paginationQuery(paginationSqlOptions) {
    const pSql = PaginationResultModel.paginationSql(paginationSqlOptions)
    return this.execute(pSql)
  }
  /**
   * @param {{sql: string; params?: any[]; limit?: string | number; offset?: string | number}} paginationSqlOptions
   */
  async paginationQueryResult(paginationSqlOptions) {
    const pSql = PaginationResultModel.paginationSql(paginationSqlOptions)
    const [result] = await this.executeResult(pSql)
    return result
  }
}

module.exports = PaginationResultModel
