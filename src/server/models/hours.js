import mongoose, { Schema } from 'mongoose';

const HoursSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  totalHours: { type: Number, required: true },
  verified: { type: Boolean, required: true },
  eventName: { type: String, required: true },
  eventDescription: { type: String },
  verifiedBy: { type: Schema.Types.ObjectId },
});

export default mongoose.model('Hours', HoursSchema, 'Hours');
