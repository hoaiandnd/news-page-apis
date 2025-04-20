const { message } = require('../constants/response.const')
const { isNumber } = require('../utils/validation.util')

class Validation {
  /**
   * Find the fist invalid parameter name
   * @param {*} req
   * @param {string[]} paramNames
   * @param {{validationFn?: (data: string) => boolean; requestSource: 'params' | 'query' | 'body'; isRequired: boolean; allowEmpty: boolean}} validationOptions
   * @returns
   */
  static #findFirstInvalidParamName(
    req,
    paramNames,
    {
      requestSource = 'params',
      isRequired = true,
      allowEmpty = false,
      validationFn = () => false
    }
  ) {
    return paramNames.find(paramName => {
      let data = req?.[requestSource]?.[paramName]
      data ??= false // check if `data` is nullish
      if (!data && isRequired) return false
      if (data.trim().length === 0 && !allowEmpty) return false
      return !validationFn?.(data)
    })
  }
  /**
   * Custom middleware function for validation
   * @param {string[]} paramNames Parameter names that need to be validated
   * @param {{validationFn?: (data: string) => boolean; errorFn?: (errorContext: {data: string; paramName: string, res: any}) => void; errorMessage?: string | (paramName: string, data: string) => string; requestSource: 'params' | 'query' | 'body'; isRequired: boolean; allowEmpty: boolean}} validationOptions
   */
  static validate(paramNames, validationOptions) {
    const {
      errorFn,
      errorMessage,
      requestSource = 'params'
    } = validationOptions
    return function (req, res, next) {
      const invalidParamName = Validation.#findFirstInvalidParamName(
        req,
        paramNames,
        validationOptions
      )
      // find the first invalid param value with name
      if (invalidParamName) {
        const data = req?.[requestSource]?.[invalidParamName]
        let errorMsg = message.fail.parameterError
        if (errorMessage) {
          errorMsg =
            typeof errorMessage === 'string'
              ? errorMessage
              : errorMessage(invalidParamName, data)
        }
        errorFn?.({ data, paramName: invalidParamName, res }) ??
          res
            .status(500)
            .json({ message: errorMsg, paramName: invalidParamName, data })
        return
      }
      next()
    }
  }
}

class DefaultValidationErrorHandler {
  /**
   * @param {string | (handlerInfo: {paramName: string, data: any}) => string} message
   * @returns {{(errorContext: {data: any; paramName: string; res: any}) => void}}
   */
  static fromMessage(message) {
    return ({ res, ...handlerInfo }) => {
      const msg = typeof message === 'string' ? message : message(handlerInfo)
      res.status(500).json({ message: msg, ...handlerInfo })
    }
  }
}

class ParseIntValidation {
  /**
   * A middleware ensures that all parameters are number
   * @param {string[]} paramNames
   * @param {(errorContext: {data: string; paramName: string, res: any}) => void} errorHandler
   */
  static validate(paramNames, errorHandler) {
    return Validation.validate(paramNames, {
      validationFn: isNumber,
      errorFn:
        errorHandler ??
        DefaultValidationErrorHandler.fromMessage(
          ({ data }) => `'${data}' is not a integer number`
        )
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
    return Validation.validate(paramName, {
      validationFn: data => values.includes(data),
      errorFn:
        errorHandler ??
        DefaultValidationErrorHandler.fromMessage(
          ({ data }) => `'${data}' is not a valid value`
        )
    })
  }
}

module.exports = {
  Validation,
  ParseIntValidation,
  EnumValidation
}
