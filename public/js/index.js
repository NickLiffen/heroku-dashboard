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
            for (var i = 0; i < arrayLength; i++) {
              let herokuAppName = response[i].name;
              herokuAppName.sort();
              console.log(herokuAppName);

            }
        });


    }); // end of document ready
})(jQuery); // end of jQuery name space
