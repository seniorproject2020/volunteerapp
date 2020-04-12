import { Strategy, ExtractJwt } from 'passport-jwt';
import Users from '../../models/users';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: 'secret',
};

// TODO Use Mongoose lean here
const init = (passport) => {
  passport.use(
    new Strategy(opts, (jwtPayload, done) => {
      Users.findById(jwtPayload.user._id)
        .then((user) => {
          if (user) {
            // TODO See if this can be rewritten to remove password to the passed user. Possibibly copy fields?
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
