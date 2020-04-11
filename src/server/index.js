import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import path from 'path';
import authJwt from './services/auth/jwt';
import routes from './routes/routes';

require('dotenv').config();

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
authJwt(passport);
app.use('/api', routes);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

const db = process.env.MONGO_URI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true },
  )
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
