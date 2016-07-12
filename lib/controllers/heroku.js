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
            heroku.get(`/apps/${app}`).then(app => {
              var data = {
              name               : app.name,
              createdDate        : app.released_at,
              lastUpdated        : app.updated_at,
              lastPersonUpdated  : "Nick Liffen",
              herokuURL          : app.web_url,
              gitURL             : app.git_url,
              buildpack          : app.buildpack_provided_description
              };
                resolve(data);
            });
        });
    },

    addOnInApp: function(app) {
        return new Promise((resolve) => {
          heroku.get(`/apps/${app.name}/addons`).then(addons => {
              var addOnsArray = [];
              var arrayLength = addons.length;
              for (var i = 0; i < arrayLength; i++) {
                console.log("About to add to the addOnsArray:" + addons[i].addon_service.name);
                  addOnsArray.push(addons[i].addon_service.name);
              }
              app.addOns = addOnsArray;
              console.log(app);
                resolve(app);
          });


        });
    }



};
