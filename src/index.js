const express = require('express')
const { server } = require('./configs')
const { env } = require('./utils')
const app = express()

server.config(app)

app.listen(env.appPort, () => {
  // eslint-disable-next-line no-console
  console.log('App is listening on port', PORT)
})
