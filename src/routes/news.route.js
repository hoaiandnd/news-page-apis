const route = require('../utils/route.util')
const NewsController = require('../controllers/NewsController')
const InjectableController = require('../controllers/providers/InjectableController')
const NewsModel = require('../models/NewsModel')
const { ParseIntParameterValidation } = require('../middlewares/validation.middleware')

const newRouter = route.createRouter()
const controller = new InjectableController(new NewsController(), new NewsModel())

newRouter.get('/', controller.fromAction('getAllNews'))
newRouter.get('/:id', ParseIntParameterValidation.validate(['id']), controller.fromAction('getNewsById'))

module.exports = newRouter
