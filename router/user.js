import koaRouter from 'koa-bodyparser'
const userRouter = new koaRouter()
userRouter.get('/')
export default userRouter