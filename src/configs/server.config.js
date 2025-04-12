const rootRouter = require('../routes/root.route')
const errorMiddleware = require('../middlewares/error-handling.middleware')
/**
 *
 * @param {Express} app Express app instance
 */
const config = app => {
  app.use(errorMiddleware)
  app.use('/api', rootRouter)
}
const server = { config }
module.exports = server
