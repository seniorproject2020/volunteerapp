import mongoose, {Schema, Document} from 'mongoose';
import {Hours} from './hours.schema'

export interface PendingHour extends Document {
    hours: Hours['_id'];
}

const PendingHourSchema: Schema = new Schema({
    hours: {type: Schema.Types.ObjectId}, 
});

export default mongoose.model<PendingHourSchema>('PendingHour', PendingHourSchema, 'PendingHours');
