const ControllerBase = require('./ControllerBase')

class NewsController extends ControllerBase {
  constructor(newsService) {
    super()
    this.newsService = newsService
  }
  // GET /news
  async getAllNews(_req, res, next) {
    try {
      const news = await this.newsService.getAllNews()
      res.status(200).json(news)
    } catch (error) {
      next(error)
    }
    // return this.createAction(async ({ res }) => {
    //   const news = await this.newsService.getAllNews()
    //   res.status(200).json(news)
    // })
  }
  // GET /news/:id
  async getNewById(req, res, next) {
    try {
      const { id } = req.params
      const foundNew = await this.newsService.getNewById(id)
      res.status(200).json(foundNew)
    } catch (error) {
      next(error)
    }
  }
  // createNews() {
  //   this.createAction(async ({ req }) => {
  //     const { title, content } = req.body
  //     const createdNew = await this.newsService.createNews(title, content)
  //     res.status(201).json(createdNew)
  //   })
  // }
}

module.exports = NewsController
