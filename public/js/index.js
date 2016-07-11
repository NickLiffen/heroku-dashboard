"use strict";

(function($){
  $(function(){

    $(".button-collapse").sideNav();

    $.ajax({
    type: 'GET',
    url: '/totalHerokuApps',
  }).done(function(response){
    console.log(response);

  });


  }); // end of document ready
})(jQuery); // end of jQuery name space
