import * as mongoose from 'mongoose';
import {Schema, Document} from 'mongoose';
import {Hours} from './hours.schema'

export interface User extends mongoose.Document {
    firstName: string,
    lastName: string,
    email: string;
    password: string;
    isAdmin: boolean;
    phone: string;
    totalHoursApproved: number;
    approvedHours: Array<Hours['_id']>;
    hoursPending: Array<Hours['_id']>;
}

const UserSchema: mongoose.Schema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    isAdmin: {type: Boolean, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String},
    totaHoursApproved: {type: Number},
    approvedHours: [Schema.Types.ObjectId],
    hoursPending: [Schema.Types.ObjectId],
});

const u : mongoose.Model<User> = mongoose.model('User', UserSchema, 'users');

export default u;

