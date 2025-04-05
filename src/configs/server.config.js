const rootRouter = require('../routes/root.route')

/**
 *
 * @param {Express} app - Express app instance
 */
const config = app => {
  app.use('/api', rootRouter)
}
const server = { config }
module.exports = server
