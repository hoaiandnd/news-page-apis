import { ResultModel } from './providers'

export class NewsModel extends ResultModel {
  constructor() {
    super()
  }
  async getAllNews() {
    return this.queryResult({
      sql: 'SELECT * FROM news'
    })
  }
}
