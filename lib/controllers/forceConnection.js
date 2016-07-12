'use strict';

var jsforce = require('jsforce');
var conn = new jsforce.Connection({
  loginUrl : 'https://login.salesforce.com'
});
conn.login('nickliffen@hotmail.com', process.env.FORCE_PASSWORD, function(err, userInfo) {
  if (err) { return console.error(err); }
  // Now you can get the access token and instance URL information.
  // Save them to establish connection next time.
  console.log(conn.accessToken);
  console.log(conn.instanceUrl);
  // logged in user property
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);
  // ...
});

module.export = conn;
