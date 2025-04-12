const { message: responseMessage } = require('../constants/response.const')

/**
 * * Converts an action function to a middleware function.
 * * Combine the `request`, `response`, and `next` parameters into a single object.
 * * Inject `res.ok`, `res.internalError`, and `res.badRequest` methods into the response object.
 * @param {(httpContext: {req: any; res: any; next: any}) => Promise<any>} action action function return a promise
 * @returns {function} middleware function
 */
const fromAction = action => {
  return async function (req, res, next) {
    try {
      res = { ...res, ok, internalError: internalServerError, badRequest }
      await action({ req, res, next })
    } catch (error) {
      next(error)
    }
  }
}
/**
 * @param {{ message?: string; data?: any; status?: number }} json
 */
const ok = json => {
  const { message = responseMessage.success.oK, data = null, status = 200 } = json
  res.status(status).json({ message, data })
}
/**
 *
 * @param {*} res Response object
 * @param {{ message?: string; data?: any; status?: number }} json
 */
const internalServerError = (res, json) => {
  const { message = responseMessage.fail.internalServerError, data = null, status = 500 } = json
  res.status(status).json({ message, data })
}

/**
 *
 * @param {*} res Response object
 * @param {{ message?: string; data?: any; status?: number }} json
 */
const badRequest = (res, json) => {
  const { message = responseMessage.fail.badRequest, data = null, status = 400 } = json
  res.status(status).json({ message, data })
}

module.exports = { fromAction }
