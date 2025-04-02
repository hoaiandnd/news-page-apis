import { ResultModel } from './providers'

export class NewsModel extends ResultModel {
  constructor() {
    super()
  }
  async getAllNews() {
    return this.executeResult({
      sql: 'SELECT * FROM news'
    })
  }
}
