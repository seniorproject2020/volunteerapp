import mongoose, {Schema, Document} from 'mongoose';
import {User} from './users.schema'

export interface Hours extends Document {
    userId: User['_id'];
    startTime: Date;
    endTime: Date;
    verified: boolean;
}

const HoursSchema: Schema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true},
    totalHours: {type: Number, required: true},
    verified: {type: Boolean, required: true},
    verifiedBy: {type: Schema.Types.ObjectId},
});

export default mongoose.model<Hours>('Hours', HoursSchema, 'Hours');