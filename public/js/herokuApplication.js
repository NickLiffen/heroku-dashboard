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

        //This function will grab all the heroku applications and then loop through the response picking the names and then sorting them into alpabetical order.
        $.ajax({
            type: 'GET',
            url: '/totalHerokuApps',
        }).done(function(response) {

            var tableContent;
            var herokuCreatedDateArray = [];

            tableContent = $('<tbody></tbody>');

            $.each(response, function() {
              //Regular Expression to remove the waste part of the date. E.G Orginally data comes in at 2016-04-111v:645. This then turns it into: 2016-04
              var tempCreateDate = this.created_at;
              var newVar = /([^-\n]+-[^-\n]+)-.*/.exec(tempCreateDate);
              herokuCreatedDateArray.push(newVar[1])
                tableContent.append(
                    `<tr>
                      <td>${this.name}</td>
                      <td><a class="waves-effect waves-light btn" id="${this.name}"><i class="material-icons left">perm_identity</i>Profile</a></td>
                    <tr>`
                );
            });

            $('#HerokuApps table').append(tableContent);


            var resultNew = order(herokuCreatedDateArray);
            var herokuCreatedDates  = resultNew[0];
            var totalAppsInMonth    = resultNew[1];
            var lineChart = document.getElementById("lineChart");

            var data = {
                labels: herokuCreatedDates,
                  datasets: [
                    {
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
                    }
                  ]
                };

                //Creating the Line chart using the data above.
                var myLineChart = new Chart(lineChart, {
                  type: 'line',
                  data: data
                });


            //On click of the profile button the user then navigates to find out more information about the application
            $('#HerokuApps').on('click', '.btn ', function(){
				          var application = this.id;
				          window.location.href = `/application/${application}`;

			          });

            //Table search function
            var $rows = $('#herokuAppTable tbody tr');
            $('#searchApps').keyup(function() {

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
