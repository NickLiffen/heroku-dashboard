"use strict";

var herokuAPI = require('../controllers/heroku.js');


module.exports = function(app, passport, bcrypt) {

  app.get('/', function(req, res) {

    var jsforce = require('jsforce');
    var conn = new jsforce.Connection();
    conn.login('2198353@gso1.lly.com', process.env.FORCE_PASSWORD, function(err, res) {
      if (err) { return console.error(err); }
      conn.query('SELECT Id, Name FROM Account', function(err, res) {
        if (err) { return console.error(err); }
        console.log(res);
      });
    });

         res.render('index.handlebars', {
           name: res
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
