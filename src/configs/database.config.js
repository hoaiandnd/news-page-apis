import { database } from '../utils/env.util'
import mysql from 'mysql2/promise'

export const connectToDb = () => {
  const connection = mysql.createPool({ ...database, waitForConnections: true, connectionLimit: 10 })
  return connection
}
