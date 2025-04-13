const { message } = require('../constants/response.const')
const { isNumber } = require('../utils/validation.util')

class Validation {
  /**
   * Custom middleware function for validation
   * @param {string[]} paramNames
   * @param {{validationFn?: (data: string) => boolean; errorFn?: (context: {data: string; paramName: string, res: any}) => void; errorMessage?: string | (paramName: string, data: string) => string; requestSource: 'params' | 'query' | 'body'; isRequired: boolean; allowEmpty: boolean}} validationOptions
   */
  static validate(paramNames, validationOptions) {
    const {
      validationFn = () => false,
      requestSource = 'params',
      errorFn,
      errorMessage,
      isRequired = true,
      allowEmpty = false
    } = validationOptions
    return function (req, res, next) {
      // find the first invalid route parameter
      const invalidParamName = paramNames.find(paramName => {
        const data = req?.[requestSource]?.[paramName]
        if ((data === undefined || data === null) && isRequired) return false
        if (data.trim().length() === 0 && !allowEmpty) return false
        return !validationFn?.(data)
      })
      if (invalidParamName) {
        const data = req?.[requestSource]?.[invalidParamName]
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

class ParseIntValidation {
  /**
   * A middleware ensures that all parameters are number
   * @param {string[]} paramNames
   * @param {(context: {data: string; paramName: string, res: any}) => void} errorHandler
   */
  static validate(paramNames, errorHandler) {
    const defaultErrorHandler = ({ data, paramName, res }) => {
      res.status(500).json({ message: `'${data}' is not a integer number`, paramName, data })
    }
    return Validation.validate(paramNames, {
      validationFn: isNumber,
      errorFn: errorHandler ?? defaultErrorHandler
    })
  }
}

class EnumValidation {
  /**
   * Check a parameter is in `values` array
   * @param {string} paramName
   * @param {string[]} values
   * @param {(context: {data: string; paramName: string, res: any}) => void} errorHandler
   */
  static validate(paramName, values, errorHandler) {
    const defaultErrorHandler = ({ data, paramName, res }) => {
      res.status(500).json({ message: `'${data}' is not a valid value`, paramName, data })
    }
    return Validation.validate(paramName, {
      validationFn: data => values.includes(data),
      errorFn: errorHandler ?? defaultErrorHandler
    })
  }
}

module.exports = {
  Validation,
  ParseIntValidation,
  EnumValidation
}
