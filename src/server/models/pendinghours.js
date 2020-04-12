import mongoose, { Schema } from 'mongoose';

// TODO Replace this with mongoose populate https://mongoosejs.com/docs/populate.html

const PendingHourSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  volunteerName: { type: String, required: true },
  eventName: { type: String, required: true },
  eventDescription: { type: String },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true }
});

export default mongoose.model('PendingHour', PendingHourSchema, 'PendingHours');
