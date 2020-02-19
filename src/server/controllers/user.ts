import User from '../models/users.schema';
import * as jwt from 'jsonwebtoken';

// TODO: Format schema and userInfo to be camelcase

const UserController = {
  async registerUser(email: string, password: string): Promise<{success: boolean, user: any, err: any}> {
    const user = await User.findOne({email});
    if(user){
      return {success: false, user:undefined, err: {
        email: 'Email already exists.',
      }};
    }
    const userInfo = {
      email: email,
      password: password,
      isAdmin: false,
      phone: '',
      firstName:'',
      lastName:'',
      totalLoggedHours: 0,
      loggedHours: [],
    }
    const newUser = new User(userInfo);
    const resUser = await newUser.save();
    resUser.password = null;
    return {success: true, user: resUser, err: undefined};
  },

  async loginUser(email: string, password: string):Promise<{success: boolean, token: string, err: any}> {
    const user = await User.findOne({email});
    if(!user){
      return {success: false, token:'', err: {emailnotfound: 'Email not found.'}};
    }

    if(password !== user.password){
      return {success: false, token:'', err: undefined};
    }

    const payload = {
      user: user,
    }
    user.password = null;

    const token = jwt.sign(payload, process.env.secretOrKey,
      {
        expiresIn: 31556926 // 1 year in seconds
      }
    );

    return {
      success: true,
      token: "JWT " + token,
      err: undefined
    }
  }
  
}

export default UserController;