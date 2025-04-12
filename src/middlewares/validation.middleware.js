const { message } = require('../constants/response.const')
const { isNumber } = require('../utils/validation.util')

class ParameterValidation {
  /**
   * @param {string[]} paramNames
   * @param {{validationFn?: (data: string) => boolean; errorFn?: (context: {data: string; paramName: string, res: any}) => void; errorMessage?: string | (paramName: string, data: string) => string}} validationOptions
   */
  static validate(paramNames, validationOptions) {
    /**
     * @param {function} next
     */
    const { validationFn = () => false, errorFn, errorMessage } = validationOptions
    return function (req, res, next) {
      for (let i = 0; i < paramNames.length; i++) {
        const paramName = paramNames[i]
        const data = req.params[paramName]
        if (!validationFn?.(data)) {
          let errorMsg = message.fail.parameterError
          if (errorMessage) {
            errorMsg = typeof errorMessage === 'string' ? errorMessage : errorMessage(paramName, data)
          }
          errorFn?.({ data, paramName, res }) ?? res.status(500).json({ message: errorMsg })
          return
        }
      }
      next()
    }
  }
}

class RequiredParameterValidation {
  /**
   * @param {string} paramName
   * @param {(data: string) => void} errorHandler
   */
  static validate(paramName, errorHandler) {
    const defaultErrorHandler = ({ data, res }) => {
      res.status(500).json({ message: `'${data}' is not a integer number`, paramName, data })
    }
    return ParameterValidation.validate(paramName, isNumber, errorHandler ?? defaultErrorHandler)
  }
}

class ParseIntParameterValidation {
  /**
   * @param {string[]} paramNames
   * @param {(context: {data: string; paramName: string, res: any}) => void} errorHandler
   */
  static validate(paramNames, errorHandler) {
    const defaultErrorHandler = ({ data, paramName, res }) => {
      res.status(500).json({ message: `'${data}' is not a integer number`, paramName, data })
    }
    return ParameterValidation.validate(paramNames, {
      validationFn: isNumber,
      errorFn: errorHandler ?? defaultErrorHandler
    })
  }
}

module.exports = { ParameterValidation, ParseIntParameterValidation, RequiredParameterValidation }
