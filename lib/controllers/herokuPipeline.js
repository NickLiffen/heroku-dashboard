'use strict';

import $ from 'jquery';

var retrievedObject = localStorage.getItem('totalHerokuPipelines');
var response = JSON.parse(retrievedObject);

        var tableContent = $('<tbody></tbody>');
        $.each(response, function() {
            tableContent.append(
                `<tr>
              <td>${this.name}</td>
              <td><a class="waves-effect waves-light btn" id="${this.id}"><i class="material-icons left">perm_identity</i>More Info</a></td>
            <tr>`
            );
        });

        $('#herokuPipeline table').append(tableContent);

        //Table search function
        var $rows = $('#herokuPipelineTable tbody tr');
        $('#searchPipeline').keyup(function() {
            var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
                reg = RegExp(val, 'i'),
                text;

            $rows.show().filter(function() {
                text = $(this).text().replace(/\s+/g, ' ');
                return !reg.test(text);
            }).hide();
        });

//On click of the profile button the user then navigates to find out more information about the application
$('#herokuPipeline').on('click', '.btn ', function() {
    console.log("Button clicked under ID" + this.id);
    var pipline = this.id;
    window.location.href = `/pipeline/${pipline}`;

});
