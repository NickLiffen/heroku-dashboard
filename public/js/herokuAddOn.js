"use strict";

(function($) {
    $(function() {

        $(".button-collapse").sideNav();

        function order(arr) {
            var a = [],
                b = [],
                prev;

            arr.sort();
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] !== prev) {
                    a.push(arr[i]);
                    b.push(1);
                } else {
                    b[b.length - 1]++;
                }
                prev = arr[i];
            }

            return [a, b];
        }


        $.ajax({
            type: 'GET',
            url: '/totalHerokuAddOns',
        }).done(function(response) {
            console.log(response);

            var applicationName = [];

            var tableContent;
            tableContent = $('<tbody></tbody>');

            $.each(response, function() {
              applicationName.push(this.app.name);
                tableContent.append(
                    `<tr>
                      <td>${this.name}</td>
                      <td>${this.app.name}</td>
                      <td><a class="waves-effect waves-light btn"><i class="material-icons left">perm_identity</i>Profile</a></td>
                    <tr>`
                );
            });

            $('#HerokuAddOns table').append(tableContent);

            var result = order(applicationName);

            //Data for the Chart JS
            const herokuAppName = result[0];
            const NoOfAddOns    = result[1];

            var $rows = $('#herokuAddOnsTable tbody tr');
            console.log($rows);
            $('#searchAddOns').keyup(function() {

                var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
                    reg = RegExp(val, 'i'),
                    text;

                $rows.show().filter(function() {
                    text = $(this).text().replace(/\s+/g, ' ');
                    return !reg.test(text);
                }).hide();

            });
        });


    }); // end of document ready
})(jQuery); // end of jQuery name space
