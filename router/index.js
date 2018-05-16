import koaRouter from 'koa-router'
import login from './login'
import register from './register'
// import user from './user'
import upload from './upload'
const router = new koaRouter()
router.use('/login', login.routes(), login.allowedMethods())
router.use('/register', register.routes(), register.allowedMethods())
// router.use('/user', user.routes(), user.allowedMethods())
router.use('/upload', upload.routes(), upload.allowedMethods())
export default router;