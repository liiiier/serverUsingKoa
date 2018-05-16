import userSchema from '../schema/userSchema'
import mongoose from '../db'
const userModel = mongoose.model('User', userSchema)
export default userModel