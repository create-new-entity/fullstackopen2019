
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const router = require('./controllers/routes');
const userRoutes = require('./controllers/userRoutes');
const config = require('./utils/config');
const errorMiddleware = require('./utils/errorMiddleware');
const loginRoutes = require('./controllers/loginRoutes');

mongoose
  .connect(config.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('DB Connected');
  })
  .catch((error) => {
    console.log('DB Connection failed');
  });

app.use(cors());
app.use(bodyParser.json());
app.use('/api/login', loginRoutes);
app.use('/api/blogs', router);
app.use('/api/users', userRoutes);
app.use(errorMiddleware.unknownEndpoint);
app.use(errorMiddleware.errorHandler);

module.exports = app;