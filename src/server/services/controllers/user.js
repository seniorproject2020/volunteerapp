import * as jwt from 'jsonwebtoken';
import User from '../../models/users';

// TODO Update Error Messages
const Controller = {
  async registerUser(email, password) {
    const user = await User.findOne({ email });

    if (user) {
      return {
        success: false,
        user: undefined,
        err: {
          email: 'Email already exists.',
        }
      };
    }

    const userInfo = {
      email,
      password,
      isAdmin: false,
      phone: '',
      firstName: '',
      lastName: '',
      totalLoggedHours: 0,
      loggedHours: [],
    };

    const newUser = new User(userInfo);
    const resUser = await newUser.save();
    resUser.password = null;
    return { success: true, user: resUser, err: undefined };
  },

  async loginUser(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      return { success: false, token: '', err: { emailnotfound: 'Email not found.' } };
    }

    if (password !== user.password) {
      return { success: false, token: '', err: undefined };
    }

    const payload = { user };
    user.password = null;

    const token = jwt.sign(
      payload,
      process.env.secretOrKey,
      {
        expiresIn: 31556926 // 1 year in seconds
      }
    );

    return {
      success: true,
      token: `JWT ${token}`,
      err: undefined
    };
  }
};

export default Controller;
