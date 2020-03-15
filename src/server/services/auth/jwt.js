import { Strategy, ExtractJwt } from 'passport-jwt';
import Users from '../../models/users';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: 'secret',
};

const init = (passport) => {
  passport.use(
    new Strategy(opts, (jwtPayload, done) => {
      Users.findById(jwtPayload.user._id)
        .then((user) => {
          if (user) {
            const newUser = {
              ...user
            };
            newUser.password = null;
            return done(null, newUser);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

export default init;
