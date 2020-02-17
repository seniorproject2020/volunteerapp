import mongoose, {Schema, Document} from 'mongoose';
import {Hours} from './hours.schema'

export interface PendingHourSchema extends Document {
    hour: Hours['_id'], 
}

const PendingHourSchema: Schema = new Schema({
    hour: [{type: Schema.Types.ObjectId, required: true}], 
});

export default mongoose.model<PendingHourSchema>('PendingHour', PendingHourSchema, 'PendingHours');
