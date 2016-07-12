import force from './forceConnection.js';

module.exports = {

  forceTest: function() {

      return new Promise((resolve, reject) => {
        console.log(force.accessToken);
      });
  },



}
