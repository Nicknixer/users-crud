const express = require('express'),
      path = require('path'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      config = require('./config'),
      requireFu = require('require-fu'),
      cors = require('cors'),
      app = express(),
      mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.database.databaseUrl, {
    useMongoClient: true,
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));
app.set('trust proxy', 1);

requireFu(__dirname + '/routes')(app);

app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json({
        success: false,
        msg: err.message
    });
});

module.exports = app;
