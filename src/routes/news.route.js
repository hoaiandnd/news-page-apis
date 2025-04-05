const { route } = require('../utils')
const { NewsController } = require('../controllers')
const { NewsModel } = require('../models')

const newRouter = route.createRouter()
const newsService = new NewsModel()
const newsController = new NewsController(newsService)

newRouter.get('/', newsController.getAllNews)
newRouter.get('/:id', newsController.getNewById)

module.exports = newRouter
