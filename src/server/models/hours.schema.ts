import mongoose, {Schema, Document} from 'mongoose';
import {User} from './users.schema'

export interface Hours extends Document {
    user_id: User['_id'];
    start_time: Date;
    end_time: Date;
    verified: boolean;
}

const HoursSchema: Schema = new Schema({
    user_id: {type: Schema.Types.ObjectId, required: true},
    start_time: {type: Date, required: true},
    end_time: {type: Date, required: true},
    verified: {type: Boolean, required: true}
});

export default mongoose.model<Hours>('Hours', HoursSchema);