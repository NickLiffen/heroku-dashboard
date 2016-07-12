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
        function barChartCreator(DOMLocation, labels, data, label, title){
          var createdChart = new Chart(DOMLocation, {
              type: 'bar',
              data: {
                  labels: labels,
                  datasets: [{
                      label: '# Heorku AddOns',
                      data: data,
                      backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 206, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(255, 159, 64, 0.2)'
                      ],
                      borderColor: [
                          'rgba(255,99,132,1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)'
                      ],
                      borderWidth: 1
                  }]
              },
              options: {
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero:true
                          }
                      }]
                  },
                  title: {
                    display: true,
                      text: 'Number of AddOns Per Applications'
                      }
              }
          });
          return createdChart;
        }


        $.ajax({
            type: 'GET',
            url: '/totalHerokuAddOns',
        }).done(function(response) {


            var applicationName = [];
            var addOnName = [];

            var tableContent;
            tableContent = $('<tbody></tbody>');

            $.each(response, function() {
              //This strips the response to include only the string before the -
              //addOnName.push(this.name.splt('-')[0])

              var tempAddOn = this.name;
              var strippedAddOn = tempAddOn.split('-')[0];
              addOnName.push(strippedAddOn);

              applicationName.push(this.app.name);

                tableContent.append(
                    `<tr>
                      <td>${this.name}</td>
                      <td>${this.app.name}</td>
                      <td><a class="waves-effect waves-light btn"><i class="material-icons left">perm_identity</i>Profile</a></td>
                    <tr>`
                );
            });

            $('#HerokuAddOns table').append(tableContent);




            //Data for the Chart JS
            var result = order(applicationName);
            var herokuAppName = result[0];
            var NoOfAddOns    = result[1];
            var chartOne = document.getElementById("addOnsPerApplication");
            barChartCreator(chartOne, herokuAppName, NoOfAddOns, '# Heorku AddOns', 'Number of AddOns Per Applications');

            var resultNew = order(addOnName);
            var herokuAddOnName = resultNew[0];
            var totalNoOfAddOns    = resultNew[1];
            var chartTwo = document.getElementById("totalOfEachAddOn");
            barChartCreator(chartTwo, herokuAddOnName, totalNoOfAddOns, '# Amount of Addons ', 'Total amount of each Add On in Heroku');


            var $rows = $('#herokuAddOnsTable tbody tr');

            $('#searchAddOns').keyup(function() {

                var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
                    reg = RegExp(val, 'i'),
                    text;

                $rows.show().filter(function() {
                    text = $(this).text().replace(/\s+/g, ' ');
                    return !reg.test(text);
                }).hide();

            });
        });


    }); // end of document ready
})(jQuery); // end of jQuery name space
