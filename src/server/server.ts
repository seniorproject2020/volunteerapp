import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import apiRouter from './routes';
require('dotenv').config();


const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const db: string = process.env.MONGO_URI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(express.static('public'));
app.use(apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
