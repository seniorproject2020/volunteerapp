import {Strategy, ExtractJwt} from 'passport-jwt';
import jwt from 'passport-jwt';
import User from '../models/users.schema';

const opts = {
  jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: 'secret',
};

const init = passport => {
  console.log('Opts: ' + JSON.stringify(opts.jwtFromRequest));
  passport.use(
    new Strategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload.user._id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

export default init;