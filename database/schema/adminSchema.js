import mongoose from '../db'
import bcrypt from 'bcrypt'
const saltRounds = 10
const Schema = mongoose.Schema;
const adminSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})
// 在密码保存到数据库之前需要加密一下
adminSchema.pre('save', async function (next) {
  // 在保存之前把密码加密
  // 对用户密码加密
  this.password = await bcrypt.hash(this.password, saltRounds).then(function (hash) {
    return hash
  });
  next()
})
adminSchema.post('save', function (doc) {
  console.log('%s has been saved', doc._id);
})
// 在保存之后把链接关闭
export default adminSchema