const express = require('express');
const cookieParser = require("cookie-parser");
const path = require('path');
const db = require('./config/mongoose-connection') 
const indexRouter = require('./routes/indexRouter')
const ownersRouter = require('./routes/ownersRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')
const expressionSession = require('express-session');
const flash = require("connect-flash")


const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(
    expressionSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');

app.use("/",indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


app.listen(3000);