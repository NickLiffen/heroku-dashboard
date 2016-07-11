"use strict";

var herokuAPI = require('../controllers/heroku.js');


module.exports = function(app, passport, bcrypt) {

  app.get('/', function(req, res) {
         res.render('index.handlebars', {
           name: "Hello"
         }); // load the login.ejs file
     });

     app.get('/totalHerokuApps', function(req, res) {

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

};
