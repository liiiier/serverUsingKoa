import Koa from "koa"
const server = new Koa();
server.use(async (ctx, next) => {
  ctx.body = 'hello koa';
  next()
})
server.listen(3000,console.log('listening...'))