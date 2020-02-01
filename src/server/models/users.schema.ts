import mongoose, {Schema, Document} from 'mongoose';
import {Hours} from './hours.schema'

export interface User extends Document {
    email: string;
    password: string;
    isAdmin: boolean;
    phone: string;
    total_logged_hours: number;
    logged_hours: Array<Hours['_id']>;
}

const UserSchema: Schema = new Schema({
    isAdmin: {type: Boolean, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String},
    total_logged_hours: {type: Number},
    logged_hours: [String]
});

//exports model and returns documents of type User
export default mongoose.model<User>('User', UserSchema);
