"use strict";

(function($) {
    $(function() {
        $(".button-collapse").sideNav();

        $('#HerokuApps').on('click', '.btn ', function(){
          console.log("Button clicked under ID" + this.id);
              var application = this.id;
              window.location.href = `/application/${application}`;

            });

    }); // end of document ready
})(jQuery); // end of jQuery name space
