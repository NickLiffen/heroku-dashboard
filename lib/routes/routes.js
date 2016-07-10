"use strict";


module.exports = function(app, passport, bcrypt) {

  app.get('/', function(req, res) {
         res.render('index.handlebars', {
           name: "Hello"
         }); // load the login.ejs file
     });

};
