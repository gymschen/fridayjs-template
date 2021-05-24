const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const winston = require('winston')
const expressWinston = require('express-winston')
const bodyParser = require('body-parser')
const app = express()


/**
 * 掛載框架
 */
require('./core/loader')(app)



/**
 * view engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


/**
 * middleware
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));


/**
 * winston route log
 */
app.use(expressWinston.logger({
  transports: [
    // new winston.transports.Console()
    new winston.transports.File({ filename: './logs/expressWinston/route.log' }),
  ],
  format: winston.format.combine(
    winston.format.label({ label: '路由請求記錄' }),
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));



/**
 * route
 */
let routes = require('./routes')(app)
app.use('/', routes);


/**
 * winston error log
 */
app.use(expressWinston.errorLogger({
  transports: [
    // new winston.transports.Console()
    new winston.transports.File({ filename: './logs/expressWinston/error.log', level: 'error' }),
  ],
  format: winston.format.combine(
    winston.format.label({ label: '路由錯誤記錄' }),
    winston.format.colorize(),
    winston.format.json()
  )
}));



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



/**
 * 客製化錯誤處理
 */
app.use(function (error, req, res, next) {
  let { helper: { verify, CustomError, resp } } = req.app
  let codeAry = [401, 40301]
  // if (error.code === 4001) {
  if (codeAry.includes(+error.code)) {
    res.json(resp.fail({ code: error.code, errorMsg: error.message, error }))
    return
  }
  next(error)
});


// error handler
app.use(function (error, req, res, next) {
  // console.log('error handler:', error)
  // res.locals.message = error.message;
  // res.locals.error = req.app.get('env') === 'dev' ? err : {};
  // res.status(error.status || 500);
  // res.render('error');
  let { helper: { verify, CustomError, resp } } = req.app
  res.json(resp.fail({ code: 500, errorMsg: error.message, error }))
});


// TODO: 全局非預期補抓錯誤處理
// process.on('uncaughtException', function (err) {
//   console.log('uncaughtException', err)
// })
// const unhandledRejections = new Map();
// process.on('unhandledRejection', (reason, promise) => {
//   unhandledRejections.set(promise, reason);
// })


module.exports = app;
