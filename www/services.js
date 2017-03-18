(function() {
  'use strict';

  angular.module('app.services', [])
    .service('GoalService', goalService)
    .service('ExerciseService', exerciseService)
    .factory('ChartFactory', chartFactory)
    .service('SessionService', sessionService)

    function sessionService($http, ApiEndpoint){
      let SERVER_URL = ApiEndpoint.url;

      this.getSessions = function() {
        return $http.get(`${SERVER_URL}/sessions`)
          .then(function(result){
            return result.data;
          })
      }

      this.getSession = function(id) {
        return $http.get(`${SERVER_URL}/sessions/${id}`)
          .then(function(result){
            return result.data;
          })
      }

      this.updateSessionExercise = function(exercise) {
        // return $http.post(`${SERVER_URL}/sessions/`, exercise)
        //   .then(function(result) {
            console.log('posting exercise');
          // })
      }

      this.newSession = function(session) {
        console.log('session',session);
        return $http.post(`${SERVER_URL}/sessions`, session)
          .then(function(result) {
            return result.data;
          })
      }
    }

    function goalService($http, ApiEndpoint) {
      let SERVER_URL = ApiEndpoint.url;
      // console.log('services module');
      this.getGoals = function() {
        return $http.get(`${SERVER_URL}/goals`).then(function(result) {
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
      SERVER_URL = ApiEndpoint.url;
      this.getExercises = function() {
        return $http.get(`${SERVER_URL}/exercises`).then(function(result) {
          console.log('get exercises');
        })
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
        //     html: '<b>Figure 1.</b> Goal Progress<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
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

     /*Data Generator */
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

}());
