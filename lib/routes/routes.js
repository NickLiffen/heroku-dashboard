"use strict";

var herokuAPI = require('../controllers/heroku.js');
var force = require('../controllers/force.js');


module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index.handlebars', {
            name: res
        }); // load the login.ejs file
    });

    app.get('/pipeline', function(req, res) {
        res.render('herokuPipelines.handlebars', {
            name: res
        }); // load the login.ejs file
    });

    app.get('/application', function(req, res) {
        res.render('herokuApplications.handlebars', {
            name: res
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

    app.get('/totalHerokuPipelines', function(req, res) {
        herokuAPI.totalHerokuPipelines()
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/pipeline/:id', function(req, res) {
      var pipelineID = req.params.id;
        herokuAPI.getPipelineDetails(pipelineID)
            .then(function(data) {
              res.render('pipeline.handlebars', {
                pipelineInfo: data,
                pipelineID: pipelineID
              });
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
    });

    app.get('/totalHerokuAddOns', function(req, res) {
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

    app.post('/forceQuery', function(req, res) {
        force.forceQuery(req.body)
            .then(function(data) {
                res.send(data);
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });

    });

    app.get('/application/:application', function(req, res) {
        var application = req.params.application;
        console.log(application);
        herokuAPI.getAppDetails(application)
            .then(function(data) {
              herokuAPI.addOnInApp(data)
              .then(function(data) {
                res.render('application.handlebars', {
                    application: data.name,
                    createdDate: data.createdDate,
                    lastUpdated: data.lastUpdated,
                    lastPersonUpdated: data.lastPersonUpdated,
                    herokuURL: data.herokuURL,
                    gitURL: data.gitURL,
                    addOns: data.addOns,
                    buildpack: data.buildpack
                }); // load the login.ejs file
            })
            .catch(function(e) {
                res.status(500, {
                    error: e
                });
            });
            });
    });

    app.get('/addon', function(req, res) {
        res.render('herokuAddOns.handlebars', {
            name: res
        }); // load the login.ejs file
    });

    app.get('/addon/:addon', function(req, res) {
        //var addOn = req.params.addon;
        res.render('herokuAddOns.handlebars', {
            name: res
        }); // load the login.ejs file
    });



};
