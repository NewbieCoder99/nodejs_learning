const 	createError            = require('http-errors'),
        express 			         = require('express'),
        path                   = require('path'),
        cookieParser 		       = require('cookie-parser'),
        logger 				         = require('morgan'),
        web 				           = require('./routes/web'),
        dashboard              = require('./routes/dashboard'),
        api 				           = require('./routes/api'),
        expressValidator 	     = require('express-validator'),
        expressSession 		     = require('express-session'),
        app 				           = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(expressValidator());
app.use(expressSession({
	secret : process.env.PASSWORD_SECRET,
	saveUninitialized: false,
	resave : false
}));
app.use('/', web);
app.use('/dashboard', dashboard);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  if(err.status != 200) {
    if(req.xhr == false) {
      return res.render('error', { title : err.status , message : err.message } );
    } else {
      return res.json( {error : err.status, message : err.message } );
    }
  }

});

module.exports = app;