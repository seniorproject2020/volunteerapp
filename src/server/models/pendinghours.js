import mongoose, { Schema } from 'mongoose';

const PendingHourSchema = new Schema({
  hours: { type: Schema.Types.ObjectId },
});

export default mongoose.model('PendingHour', PendingHourSchema, 'PendingHours');
