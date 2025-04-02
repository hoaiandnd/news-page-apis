const { route } = require('../utils')
const { NewsController } = require('../controllers')
const { NewsModel } = require('../models')

const newRouter = route.createRouter()
const newsController = new NewsController(new NewsModel())

newRouter.get('/', newsController.getAllNews)
newRouter.get('/:id', newsController.getNewById)

module.exports = newRouter
