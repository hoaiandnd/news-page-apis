const express = require('express')
const server = require('./configs/server.config')
const env = require('./utils/env.util')
const PORT = env.appPort
const app = express()

server.config(app)

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('App is listening on port', PORT)
})
