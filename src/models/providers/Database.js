import { connectToDb } from '../../configs'

export class Database {
  constructor() {
    this.connection = null
  }
  async connect() {
    if (!this.connection) {
      this.connection = await connectToDb()
    }
    return this.connection
  }
}
