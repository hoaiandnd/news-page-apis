import { createRouter } from '../utils'
import { newRouter } from './news.route'
import { userRouter } from './user.route'

const rootRouter = createRouter()

rootRouter.use('/news', newRouter)
rootRouter.use('/user', userRouter)

export { rootRouter }
