import koaRouter from 'koa-router'
import { adminLogin, userLogin } from '../controller/login'
const loginRouter = new koaRouter()
// 管理员登录成功了，也验证好了
loginRouter.post('/admin', adminLogin())
loginRouter.post('/user', userLogin())
export default loginRouter