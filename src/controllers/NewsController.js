const { message } = require('../constants/response.const')

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
    const foundNews = await service.getNewById(+id)
    res.ok({
      message: message.success.fetch,
      data: foundNews
    })
  }
}
module.exports = NewsController
