'use strict';

import Chart from 'chart.js/dist/Chart.min.js';

module.exports = {
    lineChartData: function(labels, data, locationOfChart) {
      var info = {
          labels: labels,
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
              data: data,
          }]
      };
      var lineChart = new Chart(locationOfChart, {
          type: 'line',
          data: info
      });

      return lineChart;
    },

    barChartCreator: function(DOMLocation, labels, data, label, title) {
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
    },
};
