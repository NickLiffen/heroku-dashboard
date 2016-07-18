'use strict';

import $ from 'jquery';
import callback from './callback.js';
import charts from './charts.js';


module.exports = {

    totalHerokuApps: function(){

      var retrievedObject = localStorage.getItem('totalHerokuApps');
      var response = JSON.parse(retrievedObject);

      $('#totalHerokuApps').html(response.length);

      var herokuCreatedDateArray = [];

      $.each(response, function() {
          //Regular Expression to remove the waste part of the date. E.G Orginally data comes in at 2016-04-111v:645. This then turns it into: 2016-04
          var tempCreateDate = this.created_at;
          var newVar = /([^-\n]+-[^-\n]+)-.*/.exec(tempCreateDate);
          herokuCreatedDateArray.push(newVar[1]);
      });

      var resultNew = callback.order(herokuCreatedDateArray);
      var herokuCreatedDates = resultNew[0];
      var totalAppsInMonth = resultNew[1];
      var locationOfChart = document.getElementById("lineChart");

      //Creating the Line chart using the data above.
      $('#progressBarAppsPerMonth').attr('id', 'hide');
      charts.lineChartData(herokuCreatedDates, totalAppsInMonth, locationOfChart);
    },

    totalHerokuAddOns: function(){

      var retrievedObject = localStorage.getItem('totalHerokuAddOns');
      var response = JSON.parse(retrievedObject);

      $('#totalHerokuAddOns').html(response.length);

      var applicationName = [];
      var addOnName = [];

      $.each(response, function() {
          var tempAddOn = this.name;
          var strippedAddOn = tempAddOn.split('-')[0];
          addOnName.push(strippedAddOn);
          applicationName.push(this.app.name);
      });

      $('#progressBarTotalApps').attr('id','hide');
      var result = callback.order(applicationName);
      var herokuAppName = result[0];
      var NoOfAddOns = result[1];

      for(var i = NoOfAddOns.length - 1; i >= 0; i--) {
          if(NoOfAddOns[i] === 1) {
            NoOfAddOns.splice(i, 1);
            herokuAppName.splice(i, 1);
          }
        }

        var chartOne = document.getElementById("addOnsPerApplication");
        charts.barChartCreator(chartOne, herokuAppName, NoOfAddOns, '# Heorku AddOns', 'Number of AddOns Per Applications');


        $('#progressBarTotalAddOns').attr('id','hide');
        var resultNew = callback.order(addOnName);
        var herokuAddOnName = resultNew[0];
        var totalNoOfAddOns = resultNew[1];
        var chartTwo = document.getElementById("totalOfEachAddOn");
        charts.barChartCreator(chartTwo, herokuAddOnName, totalNoOfAddOns, '# Amount of Addons ', 'Total amount of each Add On in Heroku');


    }
  };
