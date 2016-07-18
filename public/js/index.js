"use strict";

(function($) {
    $(function() {
        $(".button-collapse").sideNav();

        //This function inputs one array - then outputs two different arrays. Array 1: The number of times an element appears in the array. Array 2. Element Name.
        //Exmaple. Input: [Nick, Bob, Nick] Ouput: [Nick, Bob] [2, 1]
        function order(arr) {
            var a = [],
                b = [],
                prev;

            arr.sort();
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] !== prev) {
                    a.push(arr[i]);
                    b.push(1);
                } else {
                    b[b.length - 1]++;
                }
                prev = arr[i];
            }
            return [a, b];
        }

        //This function acts as a callback function for creating a bar chart chart. Saves having to write all the code again multiple times.
        function barChartCreator(DOMLocation, labels, data, label, title) {
            var createdChart = new Chart(DOMLocation, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: label,
                        data: data,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(255, 255, 255, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                    title: {
                        display: true,
                        text: title
                    }
                }
            });
            return createdChart;
        }

        $.ajax({
            type: 'GET',
            headers: {'Cache-Control': 'max-age=10000'},
            url: '/totalHerokuApps',
        }).done(function(response) {
            $('#totalHerokuApps').html(response.length);

            var herokuCreatedDateArray = [];

            $.each(response, function() {
                //Regular Expression to remove the waste part of the date. E.G Orginally data comes in at 2016-04-111v:645. This then turns it into: 2016-04
                var tempCreateDate = this.created_at;
                var newVar = /([^-\n]+-[^-\n]+)-.*/.exec(tempCreateDate);
                herokuCreatedDateArray.push(newVar[1]);
            });

            var resultNew = order(herokuCreatedDateArray);
            var herokuCreatedDates = resultNew[0];
            var totalAppsInMonth = resultNew[1];
            var lineChart = document.getElementById("lineChart");

            var data = {
                labels: herokuCreatedDates,
                datasets: [{
                    label: "Number of Applications Per Month",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: totalAppsInMonth,
                }]
            };

            //Creating the Line chart using the data above.
            $('#progressBarAppsPerMonth').attr('id','hide');
            new Chart(lineChart, {
                type: 'line',
                data: data
            });
        });

        $.ajax({
            type: 'GET',
            headers: {'Cache-Control': 'max-age=10000'},
            url: '/totalHerokuAddOns',
        }).done(function(response) {
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
              var result = order(applicationName);
              var herokuAppName = result[0];
              var NoOfAddOns = result[1];

              for(var i = NoOfAddOns.length - 1; i >= 0; i--) {
                  if(NoOfAddOns[i] === 1) {
                    NoOfAddOns.splice(i, 1);
                    herokuAppName.splice(i, 1);
                  }
                }

              var chartOne = document.getElementById("addOnsPerApplication");
              barChartCreator(chartOne, herokuAppName, NoOfAddOns, '# Heorku AddOns', 'Number of AddOns Per Applications');


              $('#progressBarTotalAddOns').attr('id','hide');
              var resultNew = order(addOnName);
              var herokuAddOnName = resultNew[0];
              var totalNoOfAddOns = resultNew[1];
              var chartTwo = document.getElementById("totalOfEachAddOn");
              barChartCreator(chartTwo, herokuAddOnName, totalNoOfAddOns, '# Amount of Addons ', 'Total amount of each Add On in Heroku');
            });

    }); // end of document ready
})(jQuery); // end of jQuery name space
