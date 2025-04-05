const route = require('../utils/route.util')
const { newsController } = require('../controllers/NewsController')
const newRouter = route.createRouter()

newRouter.get('/', newsController.getAllNews())
newRouter.get('/:id', newsController.getNewById)

module.exports = newRouter
