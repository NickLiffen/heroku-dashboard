"use strict";

var herokuAPI = require('../controllers/heroku.js');
var forceAPI = require('../controllers/force.js');

module.exports = function(app) {

    app.get('/', function(req, res) {
         res.render('index.handlebars', {
           name: res
         }); // load the login.ejs file
     });

     app.get('/application', function(req, res) {
          res.render('herokuApplications.handlebars', {
            name: res
          }); // load the login.ejs file
      });

      app.get('/application/:application', function(req, res) {

        var application = req.params.application;
        console.log(application);
           res.render('herokuApplications.handlebars', {
             name: res
           }); // load the login.ejs file
       });

      app.get('/addon', function(req, res) {
           res.render('herokuAddOns.handlebars', {
             name: res
           }); // load the login.ejs file
       });

       app.get('/addon/:addon', function(req, res) {

         var addOn = req.params.addon;
         console.log(addOn);
            res.render('herokuAddOns.handlebars', {
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
