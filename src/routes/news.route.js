const route = require('../utils/route.util')
const NewsController = require('../controllers/NewsController')
const { fromAction } = require('../utils/controller.util')

const newRouter = route.createRouter()
const newsController = new NewsController()

newRouter.get('/', fromAction(newsController.getAllNews))
newRouter.get('/:id', fromAction(newsController.getNewsById))

module.exports = newRouter
