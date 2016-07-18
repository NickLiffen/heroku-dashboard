'use strict';

import $ from 'jquery';

//import callback from './callback.js';


    //Get the object out of local storage
    var retrievedObject = localStorage.getItem('totalHerokuAddOns');
    var response = JSON.parse(retrievedObject);

    var tableContent = $('<tbody></tbody>');

      $.each(response, function() {
          tableContent.append(
              `<tr>
                <td>${this.name}</td>
                <td>${this.app.name}</td>
                <td><a class="waves-effect waves-light btn"><i class="material-icons left">perm_identity</i>Profile</a></td>
              <tr>`
          );
      });

      $('#herokuAddOn table').append(tableContent);

        //Table search function
        var $rows = $('#herokuAddOnTable tbody tr');
        $('#searchAddOn').keyup(function() {
            var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
                reg = RegExp(val, 'i'),
                text;

            $rows.show().filter(function() {
                text = $(this).text().replace(/\s+/g, ' ');
                return !reg.test(text);
            }).hide();
    });
