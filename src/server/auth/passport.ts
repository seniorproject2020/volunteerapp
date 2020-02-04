import {Strategy, ExtractJwt} from 'passport-jwt';
import User from '../models/users.schema';

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

const init = passport => {
  console.log(JSON.stringify(opts));
  passport.use(
    new Strategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload.id)
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