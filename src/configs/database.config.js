import { database } from '../utils/env'
import mysql from 'mysql2/promise'

const db = database

export const connectToDb = async () => {
  try {
    const connection = await mysql.createPool({ ...db, waitForConnections: true, connectionLimit: 10 })
    return connection
  } catch (error) {
    console.error('Error connecting to the database:', error.message)
    process.exit(1)
  }
}
