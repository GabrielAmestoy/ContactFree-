var createError = require('http-errors');
const express = require("express");
const app = express();
const port = 3030;
const path = require("path");
const methodOverride = require('method-override');
const session = require('express-session');
var cookieParser = require('cookie-parser');


const localsUserCheck = require('./middlewares/localsUserCheck');

var usersRouter = require("./routes/users");
var indexRouter = require("./routes");



app.listen(port, ()=> console.log("Servidor en puerto 3030"));

// POST, PUT, DELETE
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(logger('dev'));

// session para loguearse
app.use(session({
    secret: "Our secret",
    resave: false,
    saveUninitialized: true
  }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(localsUserCheck);


app.use("/users", usersRouter)
app.use("/", indexRouter)


// app.get("/", (req ,res) => res.sendFile(path.join(__dirname, "views", "home.ejs")));
// app.get("/home", (req ,res) => res.sendFile(path.join(__dirname, "views", "home.html")));
// app.get("/login", (req ,res) => res.sendFile(path.join(__dirname, "views", "login.html")));
// app.get("/register", (req ,res) => res.sendFile(path.join(__dirname, "views", "register.html")));
app.use(express.static("public"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;