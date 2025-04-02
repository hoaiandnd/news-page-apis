import express from 'express'
import { configServer } from './configs'
const PORT = 3000
const app = express()

configServer(app)

app.listen(PORT, () => {
  console.log('App is listening on port', PORT)
})
