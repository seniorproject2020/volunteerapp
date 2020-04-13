import * as jwt from 'jsonwebtoken';
import User from '../../models/users';

// TODO Update Error Messages
const Controller = {
  async registerUser(email, password) {
    const user = await User.findOne({ email });

    if (user) {
      throw new Error('Email already exists.');
    }

    const userInfo = {
      email,
      password,
      isAdmin: false,
      phone: '',
      firstName: '',
      lastName: '',
      totalHoursApproved: 0,
      loggedHours: [],
    };

    const newUser = new User(userInfo);
    await newUser.save();
  },

  async loginUser(email, password) {
    // TODO add mongoose lean
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Email not found.');
    }

    if (password !== user.password) {
      throw new Error('Invalid Password');
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

    return { token: `JWT ${token}` };
  },

  async addApprovedHours(userId, amount) {
    const user = await User.findById(userId);
    user.totalHoursApproved += amount;
    user.save();
  }
};

export default Controller;
