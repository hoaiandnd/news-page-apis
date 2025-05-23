const { message } = require('../constants/response.const')

class NewsController {
  // GET /news?limit=x&offset=y
  async getNewsList({ req, res, service }) {
    
    const news = await service.getNewsList({ ...req.query })
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
    const foundNews = await service.getNewsById(id)
    res.ok({
      message: message.success.fetch,
      data: foundNews
    })
  }
}
module.exports = NewsController
