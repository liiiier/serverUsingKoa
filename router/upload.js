import koaRouter from 'koa-router'
import uploadImg from '../utils/uploadImg'
import path from 'path'
const serverPath = comSavePath()
const router = new koaRouter()
let ret = {
  code: 0
}
router.post('/', async (ctx, next) => {
  //console.log(ctx.request.body);
  ret = await uploadImg(ctx, {
    fileType: 'avatar',
    path: serverPath
  })
  console.log(ret)
  ctx.body = 'ok'
  next()

})
function comSavePath() {
  const root = path.parse(__dirname).root
  return path.join(root, 'javaScript/serverUsingKoa/static')
}
export default router