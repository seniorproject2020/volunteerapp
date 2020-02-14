import mongoose, {Schema, Document} from 'mongoose';
import {User} from './users.schema'
import {Hours} from './hours.schema'

export interface Pending extends Document {
    verified_by: User['_id'];
    hours_pending_verification: Array<Hours['_id']>;
}

const PendingSchema: Schema = new Schema({
    hoursPendingVerification: [{type: Schema.Types.ObjectId, required: true}], 
    verifiedBy: {type: Schema.Types.ObjectId}
});

export default mongoose.model<Pending>('Pending', PendingSchema, 'pending-verification');
