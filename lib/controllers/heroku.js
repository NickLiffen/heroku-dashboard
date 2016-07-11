const Heroku = require('heroku-client')
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })


module.exports = {

  totalApplications: function(){
      return new Promise((resolve, reject) => {
        heroku.get('/apps').then(apps => {
            resolve(apps);
          })
          });
    },

};
