"use strict";


const Heroku = require('heroku-client');
const heroku = new Heroku({
    token: process.env.HEROKU_API_TOKEN
});

module.exports = {

    totalApplications: function() {
        return new Promise((resolve) => {
            heroku.get('/apps').then(apps => {
                resolve(apps);
            });
        });
    },

    totalHerokuAddOns: function() {
        return new Promise((resolve) => {
            heroku.get('/addons').then(addons => {
                resolve(addons);
            });
        });
    },

    getAppDetails: function(app) {
        return new Promise((resolve) => {

            var data = {};
            var addOnsArray = [];

            heroku.get(`/apps/${app}`).then(app => {


              data.createdDate        = app.released_at;
              data.lastUpdated        = app.updated_at;
              data.lastPersonUpdated  = "Nick Liffen";
              data.herokuURL          = app.web_url;
              data.gitURL             = app.git_url;
              data.buildpkack         = app.buildpack_provided_description;

              heroku.get(`/apps/${app}/addons`).then(addons => {

                  var arrayLength = addons.length;
                  for (var i = 0; i < arrayLength; i++) {
                      addOns.push(addons[i].addon_service.name);
                  }
              });

            });





            //resolve(data);
        });
    }



};
