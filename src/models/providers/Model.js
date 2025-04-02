import { Database } from './Database'

export class Model extends Database {
  constructor() {
    super()
  }
  /**
   *
   * @param {string} sql
   */
  async query(sql) {
    const connection = await this.connect()
    return connection.query(sql)
  }
  /**
   * 
   * @param {{sql: string; values?: any[]}} sqlOptions
   */
  async execute(sqlOptions) {
    const connection = await this.connect()
    return connection.execute(sqlOptions.sql, sqlOptions.values)
  }
}
