import koaRouter from 'koa-router'
import { userRegister } from '../controller/register'
const router = new koaRouter()
// 管理员登录成功了，也验证好了
router.post('/', userRegister())
export default router