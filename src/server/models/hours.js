import mongoose, { Schema } from 'mongoose';

const HoursSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  totalHours: { type: Number, required: true },
  verifiedStatus: { type: Number, required: true },
  eventName: { type: String, required: true },
  eventDescription: { type: String },
  verifiedBy: { type: String },
});

export default mongoose.model('Hours', HoursSchema, 'Hours');
