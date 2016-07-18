'use strict';

var totalHerokuApps, totalHerokuAddOns, totalHerokuPipelines;

     totalHerokuApps = function(){
        $.ajax({
            type: 'GET',
            headers: {
                'Cache-Control': 'max-age=10000'
            },
            url: 'totalHerokuApps',
        }).done(function(response) {
            localStorage.setItem('totalHerokuApps', JSON.stringify(response));
        });
};
    totalHerokuAddOns = function(){
        $.ajax({
            type: 'GET',
            headers: {
                'Cache-Control': 'max-age=10000'
            },
            url: '/totalHerokuAddOns',
        }).done(function(response) {
            localStorage.setItem('totalHerokuAddOns', JSON.stringify(response));
        });
};


    totalHerokuPipelines = function(){
        $.ajax({
            type: 'GET',
            headers: {
                'Cache-Control': 'max-age=10000'
            },
            url: '/totalHerokuPipelines',
        }).done(function(response) {
          localStorage.setItem('totalHerokuPipelines', JSON.stringify(response));
        });

    };
