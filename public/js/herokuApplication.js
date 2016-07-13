"use strict";

(function($) {
    $(function() {

        $(".button-collapse").sideNav();

        //This function will grab all the heroku applications and then loop through the response picking the names and then sorting them into alpabetical order.
        $.ajax({
            type: 'GET',
            url: '/totalHerokuApps',
        }).done(function(response) {
          console.log(response);
            //Empty Array - this is going to be have all the app names in so I can go and get the data critically from force.
            var appNames = [];

              $.each(response, function() {
                appNames.push(this.name);
              });

              console.log(appNames);

              $.ajax({
                  type: 'POST',
                  contentType: "application/json; charset=utf-8",
                  data: JSON.stringify(appNames),
                  url: '/forceQuery',
              }).done(function(response) {
                console.log(response);
              });


              var tableContent;

              tableContent = $('<tbody></tbody>');

            $.each(response, function() {
                tableContent.append(
                    `<tr>
                      <td>${this.name}</td>
                        <td>${this.name}</td>
                      <td><a class="waves-effect waves-light btn" id="${this.name}"><i class="material-icons left">perm_identity</i>Profile</a></td>
                    <tr>`
                );
            });

            $('#HerokuApps table').append(tableContent);

            //On click of the profile button the user then navigates to find out more information about the application
            $('#HerokuApps').on('click', '.btn ', function(){
				          var application = this.id;
				          window.location.href = `/application/${application}`;

			          });

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
        });

    }); // end of document ready
})(jQuery); // end of jQuery name space
