'use strict';

import jsforce from 'jsforce';

var connection = new jsforce.Connection({});

connection.login('liffen_nicholas@gso1.lly', process.env.FORCE_PASSWORD, function(err, userInfo) {
  if (err) { console.error(err) }
  // Now you can get the access token and instance URL information.
  // Save them to establish connection next time.
  console.log(connection.accessToken);
  console.log(connection.instanceUrl);
  // logged in user property
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);
  // ...
});

module.exports = connection;
