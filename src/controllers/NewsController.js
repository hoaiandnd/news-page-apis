const { message } = require('../constants/response.const')
const NewsModel = require('../models/NewsModel')
const { success, badRequest } = require('../utils/controller.util')
const newsModel = new NewsModel()

class NewsController {
  // GET /news
  async getAllNews({ res }) {
    const news = await newsModel.getAllNews()
    success(res, {
      message: message.success.fetch,
      data: news
    })
  }
  // GET /news/:id
  async getNewsById({ req, res }) {
    const { id } = req.params
    if (!id) {
      badRequest(res, {
        message: message.fail.requiredParamsMissing
      })
    }
    const foundNews = await newsModel.getNewById(id)
    success(res, {
      message: message.success.fetch,
      data: foundNews
    })
  }
}
module.exports = NewsController
