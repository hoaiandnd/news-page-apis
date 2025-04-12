const { message } = require('../constants/response.const')
const { isNumber } = require('../utils/validation')

class NewsController {
  // GET /news
  async getAllNews({ res, service }) {
    const news = await service.getAllNews()
    res.ok({
      message: message.success.fetch,
      data: news
    })
  }
  // GET /news/:id
  async getNewsById({ req, res, service }) {
    const { id } = req.params
    if (!id) {
      res.badRequest({
        message: message.fail.requiredParamsMissing
      })
    }
    if (isNumber(id)) {
      res.badRequest({
        message: message.fail.invalidParamType
      })
    }
    const foundNews = await service.getNewById(id)
    res.ok({
      message: message.success.fetch,
      data: foundNews
    })
  }
}
module.exports = NewsController
