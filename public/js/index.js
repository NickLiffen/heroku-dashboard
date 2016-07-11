"use strict";

(function($){
  $(function(){

    $(".button-collapse").sideNav();

    $.ajax({
    type: 'GET',
    url: '/totalHerokuApps',
  }).done(function(response){
    console.log(response.length);

  });

  $.ajax({
  type: 'GET',
  url: '/totalHerokuAddOns',
}).done(function(response){
  console.log(response.length);

});


  }); // end of document ready
})(jQuery); // end of jQuery name space
