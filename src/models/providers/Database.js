import { connectToDb } from '../../configs'

export class Database {
  constructor() {
    this.connection = null
  }
  connect() {
    if (!this.connection) {
      this.connection = connectToDb()
    }
    return this.connection
  }
}
