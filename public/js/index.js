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

        $.ajax({
            type: 'GET',
            url: '/totalHerokuApps',
        }).done(function(response) {
          console.log("about to loop through array");
            let arrayLength = response.length;

            let herokuAppNames = [];

            for (var i = 0; i < arrayLength; i++) {
              herokuAppNames.push(response[i].name);
            }

            herokuAppNames.sort();
            console.log(herokuAppNames);

        });


    }); // end of document ready
})(jQuery); // end of jQuery name space
