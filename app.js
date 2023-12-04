const cors = require('cors');
const passport = require('passport');
const routes = require('./router')
const { default: mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const { DB_NAME } = require('./constants/db');

require('dotenv').config();

const {
  passportVerifyToken, // USING
  passportVerifyAccount,
  passportConfigBasic,
} = require('./middlewares/passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Add CORS 
app.use(
  cors({
    origin: '*',
  }),
);

// mongodb connection

mongoose.connect(`mongodb+srv://${DB_NAME}`);

passport.use(passportVerifyToken);
passport.use(passportVerifyAccount);
passport.use(passportConfigBasic);

// routers ...................................................
for(const route of routes) {
  app.use(route.path, route.validator , route.router )
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
