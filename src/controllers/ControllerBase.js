class ControllerBase {
  /**
   * @param {(httpContext: {req: any; res: any; next: any}) => Promise<any>} callback
   */
  action(callback) {
    return async function (req, res, next) {
      try {
        await callback({ req, res, next })
      } catch (error) {
        next(error)
      }
    }
  }
}

module.exports = ControllerBase
