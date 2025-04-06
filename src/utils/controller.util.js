/**
 * @param {(httpContext: {req: any; res: any; next: any}) => Promise<any>} action
 */
const fromAction = action => {
  return async function (req, res, next) {
    try {
      await action({ req, res, next })
    } catch (error) {
      next(error)
    }
  }
}

/**
 *
 * @param {*} res Response object
 * @param {{ message?: string; data?: any; status?: number }} json
 */
const ok = (res, json) => {
  const { message = 'OK', data = null, status = 200 } = json
  res.status(status).json({ message, data })
}
/**
 *
 * @param {*} res Response object
 * @param {{ message?: string; data?: any; status?: number }} json
 */
const error = (res, json) => {
  const { message = 'INTERNAL_SERVER_ERROR', data = null, status = 500 } = json
  res.status(status).json({ message, data })
}

/**
 *
 * @param {*} res Response object
 * @param {{ message?: string; data?: any; status?: number }} json
 */
const badRequest = (res, json) => {
  const { message = 'BAD_REQUEST', data = null, status = 400 } = json
  res.status(status).json({ message, data })
}

module.exports = { fromAction, success: ok, error, badRequest }
