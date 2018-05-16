import adminSchema from '../schema/adminSchema'
import mongoose from '../db'
const adminModel = mongoose.model('Admin', adminSchema)
export default adminModel