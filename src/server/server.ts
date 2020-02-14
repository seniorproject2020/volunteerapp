import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import passportJwt from './auth/passport'
import apiRouter from './routes';
require('dotenv').config();


const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

console.log(process.env.MONGO_URI);
const db: string = process.env.MONGO_URI;

mongoose.set('useUnifiedTopology', true);
mongoose
  .connect(
    db,
    { useNewUrlParser: true }, 
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
  
app.use(passport.initialize());
passportJwt(passport);

app.use(express.static('public'));
app.use(apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
