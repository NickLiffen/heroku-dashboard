"use strict";

(function($) {
    $(function() {

        $(".button-collapse").sideNav();

        $.ajax({
            type: 'GET',
            url: '/totalHerokuAddOns',
        }).done(function(response) {

            var tableContent;
            tableContent = $('<tbody></tbody>');

            $.each(response, function() {
                tableContent.append(
                    `<tr>
                      <td>${this.name}</td>
                      <td>${this.app.name}</td>
                      <td><a class="waves-effect waves-light btn"><i class="material-icons left">perm_identity</i>Profile</a></td>
                    <tr>`
                );
            });

            $('#HerokuAddOns table').append(tableContent);

            var $rows = $('#herokuAddOnsTable tbody tr');

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
