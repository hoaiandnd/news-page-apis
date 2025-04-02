import { rootRouter } from '../routes'

/**
 *
 * @param {Express} app - Express app instance
 */
export const configServer = app => {
  app.use('/api', rootRouter)
}
