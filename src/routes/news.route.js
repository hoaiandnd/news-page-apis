const route = require('../utils/route.util')
const NewsController = require('../controllers/NewsController')
const InjectableController = require('../controllers/providers/InjectableController')
const NewsModel = require('../models/NewsModel')
const { ParseIntValidation } = require('../middlewares/validation.middleware')

const newRouter = route.createRouter()
const controller = new InjectableController(new NewsController(), new NewsModel())

newRouter.get('/', controller.fromAction('getNewsList'))
newRouter.get('/:id', ParseIntValidation.validate(['id']), controller.fromAction('getNewsById'))

module.exports = newRouter
