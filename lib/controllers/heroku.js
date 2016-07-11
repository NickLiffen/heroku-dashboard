const Heroku = require('heroku-client')
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })


module.exports = {

  totalApplications: function(){
    console.log("In the heroku.js file");
      return new Promise((resolve, reject) => {
        heroku.get('/apps').then(apps => {
          console.log(apps);
            resolve(apps);
          })
          });
    },


    totalHerokuAddOns: function(){
      console.log("In the heroku.js file");
        return new Promise((resolve, reject) => {
          heroku.get('/addons').then(addons => {
            console.log(addons);
              resolve(addons);
            })
            });
      }
};
