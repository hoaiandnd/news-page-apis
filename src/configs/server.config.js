const { rootRouter } = require('../routes')

/**
 *
 * @param {Express} app - Express app instance
 */
const config = app => {
  app.use('/api', rootRouter)
}

module.exports = { config }
