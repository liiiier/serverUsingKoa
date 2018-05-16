import adminModel from '../database/model/adminModel'
import userModel from '../database/model/userModel'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
const SECRET_KEY = 'MY_SECRET_KEY'
export const adminLogin = () => {
  return async (ctx, next) => {
    let data = await ctx.request.body;
    let passwordHash
    let info = Object.create(null) // 返回给前端的数据
    const query = { username: data.username }
    //const password = data.password;

    await adminModel.findOne(query, function (err, ret) {
      passwordHash = ret.password
    })
    await bcrypt.compare(data.password, passwordHash).then((res) => {
      // TODO: 我需要在这里给前端添加一个token，实现无状态登录的 // 实现了
      if (res) {
        info = {
          code: 0,
          content: '登录成功了咯',
          token: jsonwebtoken.sign({
            data: data,
            exp: Math.floor(Date.now() / 1000) + 60 * 60
          },
            SECRET_KEY
          )
        }
      } else {
        info = {
          code: 1,
          content: '密码错误'
        }
      }
    })
    ctx.body = await info
    next()
  }
}
export const userLogin = () => {
  return async (ctx, next) => {
    let data = await ctx.request.body;
    console.log(data)
    let passwordHash
    let user
    let info = Object.create(null) // 返回给前端的数据
    const query = { username: data.username }
    //const password = data.password;

    await userModel.findOne(query, function (err, ret) {
      passwordHash = ret ? ret.password : ''
      ret.password = null // 不用把密码返回给前端的
      user = ret

    })
    if (!passwordHash) {
      info.code = 1;
      info.content = '没有该用户喔，您看是不是用户名出错了呢'
    } else {
      await bcrypt.compare(data.password, passwordHash).then((res) => {
        // TODO: 我需要在这里给前端添加一个token，实现无状态登录的 // 实现了
        if (res) {
          info = {
            code: 0,
            content: '登录成功了咯',
            token: jsonwebtoken.sign({
              data: data,
              exp: Math.floor(Date.now() / 1000) + 60 * 60
            },
              SECRET_KEY
            ),
            user
          }
        } else {
          info = {
            code: 1,
            content: '密码错误'
          }
        }
      })
    }

    ctx.body = await info
    next()
  }
}