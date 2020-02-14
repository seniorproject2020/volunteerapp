import * as mongoose from 'mongoose';
import {Hours} from './hours.schema'

export interface User extends mongoose.Document {
    first_name: string,
    last_name: string,
    email: string;
    password: string;
    isAdmin: boolean;
    phone: string;
    total_logged_hours: number;
    logged_hours: Array<Hours['_id']>;
}

const UserSchema: mongoose.Schema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    isAdmin: {type: Boolean, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String},
    totalLoggedHours: {type: Number},
    loggedHours: [String]
});

const u : mongoose.Model<User> = mongoose.model('User', UserSchema, 'users');

export default u;

