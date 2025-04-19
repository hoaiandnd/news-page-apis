const { message: responseMessage } = require('../../constants/response.const')

class Controller {
  constructor(controller) {
    this.controller = controller
  }
  /**
   * Inject utilties methods to response object
   * @param {any} res 
   * @returns 
   */
  static extendedResponseMethods(res) {
    /**
     * @param {{ message?: string; data?: any; status?: number }} json
     */
    return {
      ok: json => {
        const { message = responseMessage.success.oK, data = null, status = 200 } = json
        res.status(status).json({ message, data })
      },
      /**
       *
       * @param {*} res Response object
       * @param {{ message?: string; data?: any; status?: number }} json
       */
      internalServerError: (res, json) => {
        const { message = responseMessage.fail.internalServerError, data = null, status = 500 } = json
        res.status(status).json({ message, data })
      },

      /**
       *
       * @param {*} res Response object
       * @param {{ message?: string; data?: any; status?: number }} json
       */
      badRequest: (res, json) => {
        const { message = responseMessage.fail.badRequest, data = null, status = 400 } = json
        res.status(status).json({ message, data })
      }
    }
  }
  /**
   * * Converts an action function to a middleware function.
   * * Combine the `request`, `response`, and `next` parameters into a single object.
   * * Inject response methods into the `response` object.
   * @param {string} actionName action function return a promise
   * @returns {function} middleware function
   */
  fromAction(actionName, service) {
    service ||= undefined
    const controller = this.controller
    return async function (req, res, next) {
      try {
        res = { ...res, ...Controller.extendedResponseMethods(res) }
        await controller[actionName]({ req, res, next, service })
      } catch (error) {
        next(error)
      }
    }
  }
}
module.exports = Controller
