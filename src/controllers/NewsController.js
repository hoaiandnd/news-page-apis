const { message } = require('../constants/response.const')
const NewsModel = require('../models/NewsModel')
const newsModel = new NewsModel()

class NewsController {
  // GET /news
  async getAllNews({ res }) {
    const news = await newsModel.getAllNews()
    res.ok({
      message: message.success.fetch,
      data: news
    })
  }
  // GET /news/:id
  async getNewsById({ req, res }) {
    const { id } = req.params
    if (!id) {
      res.badRequest({
        message: message.fail.requiredParamsMissing
      })
    }
    const foundNews = await newsModel.getNewById(id)
    res.ok({
      message: message.success.fetch,
      data: foundNews
    })
  }
}
module.exports = NewsController
