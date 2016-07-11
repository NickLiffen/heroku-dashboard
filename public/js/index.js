"use strict";

(function($) {
    $(function() {

        $(".button-collapse").sideNav();

        $.ajax({
            type: 'GET',
            url: '/totalHerokuApps',
        }).done(function(response) {
          console.log("were here");
            $('#totalHerokuApps').html(response.length);
        });

        $.ajax({
            type: 'GET',
            url: '/totalHerokuAddOns',
        }).done(function(response) {
            $('#totalHerokuAddOns').html(response.length);
        });

        //This function will grab all the heroku applications and then loop through the response picking the names and then sorting them into alpabetical order.
        $.ajax({
            type: 'GET',
            url: '/totalHerokuApps',
        }).done(function(response) {
          console.log("about to loop through array");
            let tableContent;
    						tableContent= $('<tbody></tbody>');
    						$.each(response, function(){
                  tableContent.append(
                    `<tr>
                      <td>${this.name}</td>
                      <td><a class="waves-effect waves-light btn"><i class="material-icons left">perm_identity</i>Profile</a></td>
                    <tr>`
                  );
                });
                $('#ClassList table').append(tableContent);
        });


    }); // end of document ready
})(jQuery); // end of jQuery name space
