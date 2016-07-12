'use strict';

var jsforce = require('jsforce');
var conn = new jsforce.Connection({
  loginUrl : 'https://login.salesforce.com'
});
conn.login('nickliffen@hotmail.com', `${process.env.FORCE_PASSWORD}${process.env.SECURITYTOKEN}`, function(err, userInfo) {
  if (err){
      console.error(err);
    }
    else{
      console.log(conn.accessToken);
      console.log(conn.instanceUrl);
      // logged in user property
      console.log("User ID: " + userInfo.id);
      console.log("Org ID: " + userInfo.organizationId);
    }

  conn.query("SELECT Id, Name FROM Suggestion__c WHERE Name = 'Change Seat' ", function(err, result) {
      if (err) { return console.error(err); }
      console.log(result);
          });
});

module.export = conn;
