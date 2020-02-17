import mongoose, {Schema, Document} from 'mongoose';
import {User} from './users.schema'
import {Hours} from './hours.schema'

export interface Pending extends Document {
    hours: Hours['_id'];
}

const PendingSchema: Schema = new Schema({
    hours: {type: Schema.Types.ObjectId}, 
});

export default mongoose.model<Pending>('Pending', PendingSchema, 'pending-verification');
