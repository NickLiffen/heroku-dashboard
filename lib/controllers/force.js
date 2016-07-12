'use strict';

var jsforce = require('jsforce');
var conn = new jsforce.Connection();
conn.login('2198353@gso1.lly.com', process.env.FORCE_PASSWORD, function(err, res) {
  if (err) { return console.error(err); }
  conn.query('SELECT Id, Name FROM Account', function(err, res) {
    if (err) { return console.error(err); }
  
  });
});
