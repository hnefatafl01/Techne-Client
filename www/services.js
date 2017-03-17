(function() {
  'use strict';
  // console.log(ApiEndpoint);
  // const SERVER_URL = ApiEndpoint;
  // const SERVER_URL = 'http://localhost:5000';



  angular.module('app.services', [])
    .service('GoalService', service)
    .service('ExerciseService', exerciseService)
    .factory('ChartFactory', chartFactory)
    // .service('JournalService', journalService)

    function service($http, ApiEndpoint) {
      const SERVER_URL = ApiEndpoint.url;
      console.log(ApiEndpoint);
      // console.log('services module');
      this.getGoals = function() {
        return $http.get(SERVER_URL + '/goals').then(function(result) {
          // console.log('get goals');
          // console.log(result.data);
          return result.data;
        })
      }

      this.postGoal = function(newGoal) {
        return $http.post(`${SERVER_URL}/goals`, newGoal).then(function(result) {
          console.log(result.data);
          return result.data;
        })
      }
    }

    function exerciseService($http) {
      this.getExercises = function() {
        // return $http.get(`${}/exercises`).then(function(result) {
          console.log('get exercises');
        // })
      }
    }

    function chartFactory() {
      var options = {
        chart: {
          type: 'lineChart',
          height: 350,
          margin : {
              top: 10,
              right: 10,
              bottom: 40,
              left: 55
          },
          x: function(d){ return d.x; },
          y: function(d){ return d.y; },
          useInteractiveGuideline: true,
          dispatch: {
              stateChange: function(e){ console.log("stateChange"); },
              changeState: function(e){ console.log("changeState"); },
              tooltipShow: function(e){ console.log("tooltipShow"); },
              tooltipHide: function(e){ console.log("tooltipHide"); }
          },
          xAxis: {
              axisLabel: 'day'
          },
          yAxis: {
              axisLabel: 'reps',
              tickFormat: function(d){
                  return d3.format('5')(d);
              },
              axisLabelDistance: -10
          },
          callback: function(chart){
              console.log("!!! lineChart callback !!!");
          }
        },
        title: {
            enable: true,
            text: ''
        },
        subtitle: {
            enable: false,
            text: '',
            css: {
                'text-align': 'center',
                'margin': '10px 13px 0px 7px'
            }
        }
        // ,
        // caption: {
        //     enable: true,
        //     html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem      abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
        //     css: {
        //         'text-align': 'justify',
        //         'margin': '10px 13px 0px 7px'
        //     }
        //   }
        };

      var data = goalData();

      var factory = {
        options: options,
        data: data
      }
      return factory;

     /*Random Data Generator */
      function goalData() {
        var loadData = [];
        var repData = [];

        //Data is represented as an array of {x,y} pairs.
        for (var i = 0; i < 30; i++) {
          loadData.push({x: i, y: i });
          repData.push({x: i, y: i });
        }

        //Line chart data should be sent as an array of series objects.
        return [{
            values: loadData,      //values - represents the array of {x,y} data points
            key: 'exercise load', //key  - the name of the series.
            color: '#ff7f0e',  //color - optional: choose your own line color.
            area: false
          },{
            values: repData,      //values - represents the array of {x,y} data points
            key: 'exercise reps', //key  - the name of the series.
            color: 'blue',  //color - optional: choose your own line color.
            area: false
          }
        ];
      };
    }

    function journalService($http){
      // return $http.get(`${SERVER_URL}/session`)
      //   .then(function(result){
      //     console.log('result.data');
      //   })
    }

}());
