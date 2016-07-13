
'use strict';

var jsforce = require('jsforce');

var conn = new jsforce.Connection({
  loginUrl : 'https://login.salesforce.com'
});
conn.login('nickliffen@hotmail.com', `${process.env.FORCE_PASSWORD}${process.env.SECURITYTOKEN}`, function(err, userInfo) {
  if (err){
      console.error("ERROR:" + err);
    }
    else{
    }
});

module.exports = {
    forceQuery: function(appName) {

        return new Promise((resolve, reject) => {

          var emptyArray = [];

          var arrayLength = appName.length;
            for (var i = 0; i < arrayLength; i++) {
                conn.query(`SELECT Data_Criticality__c FROM ${appName[i]}__c`, function(err, result) {

                    if (err){
                      reject(err);
                    } else{
                      console.log(result);
                      //emptyArray.push(result);
                    }

                        });


                      }

                      //resolve(emptyArray);

            });
        }
  }
