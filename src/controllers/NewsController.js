const ControllerBase = require('./ControllerBase')
const NewsModel = require('../models/NewsModel')
const newsModel = new NewsModel()

class NewsController extends ControllerBase {
  constructor() {
    super()
  }
  // GET /news
  async getAllNews({ res }) {
    const news = await newsModel.getAllNews()
    res.status(200).json(news)
  }
  // GET /news/:id
  async getNewsById({ req, res }) {
    const { id } = req.params
    const foundNews = await newsModel.getNewById(id)
    res.status(200).json(foundNews)
  }
}
module.exports = NewsController
