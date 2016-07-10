"use strict";

//Import all node modules
import express from 'express';
import exphbs from 'express-handlebars';
import passport from 'passport';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcrypt-nodejs';
import compression from 'compression';

//Load the .env file from root directory.
dotenv.load();
//Puts express onto the application
const app  = express();
//Port which the node server will run on.
const port = process.env.PORT || 8080;

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());

// compress all routes
app.use(compression());

//Setting our Template Engine to handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'lib/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use('/node', express.static(__dirname + '/node_modules'));

//Passing our Passport Information and Application Information to our routes
require('./lib/routes/routes.js')(app, passport, bcrypt);

app.listen(port);
console.log('Server connection established');
console.log('Using The Following Port: ' + port);
