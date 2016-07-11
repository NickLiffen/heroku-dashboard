"use strict";

(function($){
  $(function(){

    $(".button-collapse").sideNav();

    $.ajax({
    type: 'GET',
    url: '/totalHerokuApps',
  }).done(function(response){
    $('#totalHerokuApps').html(response.length);
  });

  $.ajax({
  type: 'GET',
  url: '/totalHerokuAddOns',
}).done(function(response){
  $('#totalHerokuAddOns').html(response.length);
});


  }); // end of document ready
})(jQuery); // end of jQuery name space
