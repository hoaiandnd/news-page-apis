class NewsController {
  constructor(newsService) {
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
}

module.exports = NewsController
