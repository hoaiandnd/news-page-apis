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
      // find the first invalid route parameter
      const invalidParamName = paramNames.find(paramName => {
        const data = req.params?.[paramName]
        return !validationFn?.(data)
      })
      if (invalidParamName) {
        const data = req.params[invalidParamName]
        let errorMsg = message.fail.parameterError
        if (errorMessage) {
          errorMsg = typeof errorMessage === 'string' ? errorMessage : errorMessage(invalidParamName, data)
        }
        errorFn?.({ data, invalidParamName, res }) ??
          res.status(500).json({ message: errorMsg, paramName: invalidParamName, data })
        return
      }
      next()
    }
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
/**
 * Check whether
 */
class EnumParameterValidation {
  /**
   * @param {string} paramName
   * @param {string[]} values
   * @param {(context: {data: string; paramName: string, res: any}) => void} errorHandler
   */
  static validate(paramName, values, errorHandler) {
    const defaultErrorHandler = ({ data, paramName, res }) => {
      res.status(500).json({ message: `'${data}' is not a valid value`, paramName, data })
    }
    return ParameterValidation.validate(paramName, {
      validationFn: data => values.includes(data),
      errorFn: errorHandler ?? defaultErrorHandler
    })
  }
}

module.exports = { ParameterValidation, ParseIntParameterValidation, EnumParameterValidation }
