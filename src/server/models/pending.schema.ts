import mongoose, {Schema, Document} from 'mongoose';
import {User} from './users.schema'
import {Hours} from './hours.schema'

export interface Pending extends Document {
    verified_by: User['_id'];
    hours_pending_verification: Array<Hours['_id']>;
}

const PendingSchema: Schema = new Schema({
    hours_pending_verification: [Schema.Types.ObjectId], 
    verified_by: {type: Schema.Types.ObjectId, required: true}
});

export default mongoose.model<Pending>('Pending', PendingSchema);
