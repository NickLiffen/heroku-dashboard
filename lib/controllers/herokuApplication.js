'use strict';

import $ from 'jquery';

//import callback from './callback.js';

var retrievedObject = localStorage.getItem('totalHerokuApps');
var response = JSON.parse(retrievedObject);

        var tableContent = $('<tbody></tbody>');

        $.each(response, function() {
            tableContent.append(
                `<tr>
              <td>${this.name}</td>
                <td>${this.name}</td>
              <td><a class="waves-effect waves-light btn" id="${this.id}"><i class="material-icons left">perm_identity</i>More Info</a></td>
            <tr>`
            );
        });

        $('#HerokuApps table').append(tableContent);

        //Table search function
        var $rows = $('#herokuAppTable tbody tr');
        $('#searchApps').keyup(function() {
            var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
                reg = RegExp(val, 'i'),
                text;

            $rows.show().filter(function() {
                text = $(this).text().replace(/\s+/g, ' ');
                return !reg.test(text);
            }).hide();
        });


//On click of the profile button the user then navigates to find out more information about the application
$('#HerokuApps').on('click', '.btn ', function() {
    console.log("Button clicked under ID" + this.id);
    var application = this.id;
    window.location.href = `/application/${application}`;

});
