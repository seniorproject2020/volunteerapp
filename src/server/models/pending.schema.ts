import mongoose, {Schema, Document} from 'mongoose';
import {User} from './users.schema'
import {Hours} from './hours.schema'

export interface Pending extends Document {
    verifiedBy: User['_id'];
    hoursPendingVerification: Array<Hours['_id']>;
}

const PendingSchema: Schema = new Schema({
    hoursPendingVerification: [Schema.Types.ObjectId], 
    verifiedBy: {type: Schema.Types.ObjectId, required: true}
});

export default mongoose.model<Pending>('Pending', PendingSchema, 'pending-verification');
