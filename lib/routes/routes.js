"use strict";

var herokuAPI = require('../controllers/heroku.js');


module.exports = function(app, passport, bcrypt) {

  app.get('/', function(req, res) {
         res.render('index.handlebars', {
           name: "Hello"
         }); // load the login.ejs file
     });

     app.get('/totalHerokuApps', function(req, res) {
       console.log("In the route");
       herokuAPI.totalApplications()
       .then(function(data) {
               res.send(data);
           })
           .catch(function(e) {
               res.status(500, {
                   error: e
               });
           });

     });

     app.get('/totalHerokuAddOns', function(req, res) {
       console.log("In the route");
       herokuAPI.totalHerokuAddOns()
       .then(function(data) {
               res.send(data);
           })
           .catch(function(e) {
               res.status(500, {
                   error: e
               });
           });

     });

};
