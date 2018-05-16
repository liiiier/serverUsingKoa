import mongoose from '../db'
import bcrypt from 'bcrypt'
import { Number } from 'core-js';
const saltRounds = 10
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // 创建时间
  createAt: {
    type: Date,
    default: Date.now()
  },
  // 用户的好友
  friends: {
    type: Array,
    default: []
  },
  // 关注他的人
  followers: {
    type: Array,
    default: []
  },
  // 关注的人
  following: {
    type: Array,
    default: []
  },
  // 创建的歌单
  discCreated: {
    type: Array,
    default: []
  },
  // 创建的话题
  topicCreated: {
    type: Array,
    default: []
  },
  songFavor: {
    type: Array,
    default: []
  },
  singerFavor: {
    type: Array,
    default: []
  },
  listenHistory: {
    week: {
      type: Array,
      default: []
    },
    allTime: {
      type: Array,
      default: []
    }
  },
  // 每日推荐
  dayRecommend: {
    type: Array,
    default: []
  },
  comments: {
    to: {
      user: String,
      content: String,
      commentAt: {
        type: Date
      }
    },
    from: {
      user: String,
      content: String,
      commentAt: {
        type: Date
      }
    }
  },
  // 收到的消息
  message: {
    type: Array,
    default: []
  },
  // 用户信息
  info: {
    avatar: {
      type: String
    },
    signature: {
      type: String
    },
    sex: {
      type: String,
      default: 'male'
    },
    tel: {
      type: Number
    },
    isVip: {
      type: Boolean,
      default: false
    }
  }
})
// 在密码保存到数据库之前需要加密一下
userSchema.pre('save', async function (next) {
  // 在保存之前把密码加密
  // 对用户密码加密
  this.password = await bcrypt.hash(this.password, saltRounds).then(function (hash) {
    return hash
  });
  next()
})
userSchema.post('save', function (doc) {
  console.log('%s has been saved', doc._id);
})
// 在保存之后把链接关闭
export default userSchema