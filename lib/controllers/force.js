'use strict';

var jsforce = require('jsforce');

var conn = new jsforce.Connection({
    loginUrl: 'https://login.salesforce.com'
});
conn.login('nickliffen@hotmail.com', `${process.env.FORCE_PASSWORD}${process.env.SECURITYTOKEN}`, function(err, userInfo) {
    if (err) {
        console.error("ERROR:" + err);
    } else {}
});

module.exports = {
    forceQuery: function(appName) {

        return new Promise((resolve, reject) => {

          var newArrray = [];

          var applicationsLength = appName.length;

          for (var i = 0; i < applicationsLength; i++) {
            var temp =  appName[i].replace(/-/g , "_");
            temp += "__c"
            newArrray.push(temp);
          }

          var newArrayLength = newArrray.length;

          for (var i = 0; i < newArrayLength; i++) {
            conn.query(`SELECT ID, Data_Criticality__c FROM ${newArrray[i]}`, function(err, result) {
              var CCILevel = result.records.map(function(a) {return a.Data_Criticality__c});

              JSON.stringify(CCILevel);

              console.log(CCILevel);

            });
          }

        });
    }
}
