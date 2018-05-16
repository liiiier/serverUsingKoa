import userModel from '../database/model/userModel'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
const SECRET_KEY = 'MY_SECRET_KEY'
// TODO: 在这里保存注册的新用户
// 但是在注册之前要有许多的工作需要做的
// 检查后台是否已经有了该用户名了，如果没有就直接注册
// 有就返回信息给前端，让他更改用户名
export const userRegister = () => {
  return async (ctx, next) => {
    let data = await ctx.request.body;
    let info = Object.create(null) // 返回给前端的数据
    const query = { username: data.username }
    //const password = data.password;
    const user = new userModel({
      username: data.username,
      password: data.password
    })
    await userModel.findOne(query, async function (err, ret) {
      console.log(ret)
      if (!ret) {
        // 如果查询为空，说明可以注册了
        await user.save(function (err) {
          if (err) {
            console.log(err)
          }
        })
        info = {
          code: 0,
          content: '注册成功啦...欢迎加入我们喔'
        }
      } else {
        info = {
          code: 1,
          content: '已经有该用户了喔，换一个用户明吧'
        }
      }
    })
    ctx.body = await info
    next()
  }
}