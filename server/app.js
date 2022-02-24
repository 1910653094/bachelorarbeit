const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./config/database').connect().then(() => console.log('Connected!'));

const { datesRouter, userRouter } = require('./routes');

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use('/user', userRouter);
app.use('/dates', datesRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
