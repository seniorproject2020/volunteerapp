import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  isAdmin: { type: Boolean, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  totalHoursApproved: { type: Number },
  approvedHours: [Schema.Types.ObjectId],
  hoursPending: [Schema.Types.ObjectId],
});

export default mongoose.model('User', UserSchema, 'Users');
