const route = require('../utils/route.util')
const newRouter = require('./news.route')
const userRouter = require('./user.route')

const rootRouter = route.createRouter()

rootRouter.use('/news', newRouter)
rootRouter.use('/user', userRouter)

module.exports = rootRouter
