import Koa from "koa"
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import cors from 'koa2-cors'
import jwt from 'koa-jwt'
import router from './router/index'
import koaStatic from 'koa-static'
import path from 'path'
const app = new Koa();
const SECRET_KEY = 'MY_SECRET_KEY'
const staticPath = './static'
app.use(logger());
app.use(cors({
  origin: 'http://localhost:3000'
}))
 app.use(jwt({
  secret: SECRET_KEY
}).unless({
  path: [/\/register/, /\/login/, /\/avatar/]
}))
app.use(koaStatic(
  path.join(__dirname, staticPath)
))
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())
app.listen(4000, console.log('port 3000 is on listening....'))