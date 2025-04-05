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
module.exports = { fromAction }
