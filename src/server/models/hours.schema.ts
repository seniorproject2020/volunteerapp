import mongoose, {Schema, Document} from 'mongoose';
import {User} from './users.schema'

export interface Hours extends Document {
    user_id: User['_id'];
    start_time: Date;
    end_time: Date;
    verified: boolean;
}

const HoursSchema: Schema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true},
    totalHours: {type: Number, required: true},
    verified: {type: Boolean, required: true}
});

export default mongoose.model<Hours>('Hours', HoursSchema, 'hours');