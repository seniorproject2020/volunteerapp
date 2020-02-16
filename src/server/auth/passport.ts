import {Strategy, ExtractJwt} from 'passport-jwt';
import User from '../models/users.schema';

const opts = {
  jwtFromRequest:  ExtractJwt.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: "secret",
};

const init = passport => {
  passport.use(
    new Strategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload.user._id)
        .then(user => {
          if (user) {
            user.password = null;
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

export default init;