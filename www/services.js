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

      this.postSession = function(session) {
        return $http.post(`${SERVER_URL}/sessions`, session)
          .then(function(result){
            return result.data;
          })
      }

      this.getSessionWithExercises = function(id) {
        return $http.get(`${SERVER_URL}/sessions/${id}/exercises`)
          .then(function(result) {
            return result.data;
          })
      }

      this.addExercisesToSession = function(id, exercise) {
        // console.log(session);
        return $http.post(`${SERVER_URL}/sessions/${id}/exercises`, exercise)
          .then(function(result) {
            console.log('posting session.exercises');
            // console.log(result.data);
            return result.data;
          })
      }

      this.updateSession = function(id, session) {
        return $http.put(`${SERVER_URL}/sessions/edit/${id}`, session)
          .then(function(result) {
            console.log(result.data);
            return result.data;
          })
      }

      this.deleteExerciseFromSession = function(exerciseId) {
        console.log('hi');
      // let id = session.id
        return $http.delete(`${SERVER_URL}/exercises/delete/${exerciseId}`)
          .then((result) => {
            console.log('deleted');
            return result;
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
          return result.data;
        })
      }
    }

    function exerciseService($http, ApiEndpoint) {
      let SERVER_URL = ApiEndpoint.url;
      this.getExercises = function() {
        return $http.get(`${SERVER_URL}/exercises`).then(function(result) {
          console.log('get exercises');
        })
      }
      this.postExercise = function(exercise) {
        return $http.post(`${SERVER_URL}/exercises`, exercise).then(function(result) {
          console.log('post exercise', result);

        })
      }
    }

    function chartFactory() {
    //   var options = {
    //     chart: {
    //       type: 'lineChart',
    //       height: 350,
    //       margin : {
    //           top: 10,
    //           right: 10,
    //           bottom: 40,
    //           left: 55
    //       },
    //       x: function(d){ return d.x; },
    //       y: function(d){ return d.y; },
    //       useInteractiveGuideline: true,
    //       dispatch: {
    //           stateChange: function(e){ console.log("stateChange"); },
    //           changeState: function(e){ console.log("changeState"); },
    //           tooltipShow: function(e){ console.log("tooltipShow"); },
    //           tooltipHide: function(e){ console.log("tooltipHide"); }
    //       },
    //       xAxis: {
    //           axisLabel: 'day'
    //       },
    //       yAxis: {
    //           axisLabel: 'reps',
    //           tickFormat: function(d){
    //               return d3.format('5')(d);
    //           },
    //           axisLabelDistance: -10
    //       },
    //       callback: function(chart){
    //           console.log("!!! lineChart callback !!!");
    //       }
    //     },
    //     title: {
    //         enable: false,
    //         text: ''
    //     },
    //     subtitle: {
    //         enable: false,
    //         text: '',
    //         css: {
    //             'text-align': 'center',
    //             'margin': '10px 13px 0px 7px',
    //             'color': '#FFF'
    //         }
    //     }
    //     // ,
    //     // caption: {
    //     //     enable: true,
    //     //     html: '<b>Figure 1.</b> Goal Progress<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
    //     //     css: {
    //     //         'text-align': 'justify',
    //     //         'margin': '10px 13px 0px 7px'
    //     //     }
    //     //   }
    //     };
    //
    //   var data = goalData();
    //
      // var factory = {
      //   options: options,
      //   data: data
      // }
      // return factory;
    //
    //  /*Data Generator */
    //   function goalData() {
    //     var loadData = [];
    //     var repData = [];
    //
    //     //Data is represented as an array of {x,y} pairs.
    //     for (var i = 0; i < 30; i++) {
    //       loadData.push({x: i, y: i });
    //       repData.push({x: i, y: i });
    //     }
    //
    //     //Line chart data should be sent as an array of series objects.
    //     return [{
    //         values: loadData,      //values - represents the array of {x,y} data points
    //         key: 'exercise load', //key  - the name of the series.
    //         color: '#E64759',  //color - optional: choose your own line color.
    //         area: false
    //       },{
    //         values: repData,      //values - represents the array of {x,y} data points
    //         key: 'exercise reps', //key  - the name of the series.
    //         color: '#9F86FF',  //color - optional: choose your own line color.
    //         area: false
    //       }
    //     ];
    //   };
    // }

        // var options = {
        //     chart: {
        //         type: 'multiBarChart',
        //         height: 500,
        //         margin : {
        //             top: 20,
        //             right: 20,
        //             bottom: 45,
        //             left: 45
        //         },
        //         clipEdge: true,
        //         duration: 500,
        //         stacked: true,
        //         xAxis: {
        //             axisLabel: 'Sessions',
        //             showMaxMin: false,
        //             tickFormat: function(d){
        //                 return d3.format(',f')(d);
        //             }
        //         },
        //         yAxis: {
        //             axisLabel: 'Volume: reps x load',
        //             axisLabelDistance: -20,
        //             tickFormat: function(d){
        //                 return d3.format()(d);
        //             }
        //         }
        //     }
        // };

        // var data = generateData(3, 30, 1 );

        // var factory = {
        //   options: options,
        //   data: data
        // }
        //
        // return factory;

        // function generateData(z,x,y) {
        //   return stream_layers(z,x,y).map(function(data, i) {
        //       return {
        //           key: 'Stream' + i,
        //           values: data
        //           // ,
        //           // color: '#E64759'
        //       };
        //   });
        // }
        //
        // function stream_layers(numLayers, layerLength, barHeight) {
        //   return d3.range(numLayers).map(function() {
        //       var a = [], i;
        //       for (i = 0; i < layerLength; i++) a[i] = barHeight ;
        //       return a.map(stream_index);
        //   });
        // }

        /* Another layer generator using gamma distributions. */
        // function stream_waves(n, m) {
        //     return d3.range(n).map(function(i) {
        //         return d3.range(m).map(function(j) {
        //             var x = 20 * j / m - i / 3;
        //             return 2 * x * Math.exp(-.5 * x);
        //         }).map(stream_index);
        //     });
        // }

        // function stream_index(d, i) {
        //   return {
        //     x: i,
        //     y: Math.max(0, d)
        //   };
        // }
// }
// var factory = {
//   options: options,
//   data: data
// }
//
// return factory;
//
//     var options = {
//       chart: {
//           type: 'historicalBarChart',
//           height: 450,
//           margin : {
//               top: 20,
//               right: 20,
//               bottom: 65,
//               left: 50
//           },
//           x: function(d){return d[0];},
//           y: function(d){return d[1]/100000;},
//           showValues: true,
//           valueFormat: function(d){
//               return d3.format(',.1f')(d);
//           },
//           duration: 100,
//           xAxis: {
//               axisLabel: 'X Axis',
//               tickFormat: function(d) {
//                   return d3.time.format('%x')(new Date(d))
//               },
//               rotateLabels: 30,
//               showMaxMin: false
//           },
//           yAxis: {
//               axisLabel: 'Y Axis',
//               axisLabelDistance: -10,
//               tickFormat: function(d){
//                   return d3.format(',.1f')(d);
//               }
//           },
//           tooltip: {
//               keyFormatter: function(d) {
//                   return d3.time.format('%x')(new Date(d));
//               }
//           },
//           zoom: {
//               enabled: true,
//               scaleExtent: [1, 10],
//               useFixedDomain: false,
//               useNiceScale: false,
//               horizontalOff: false,
//               verticalOff: true,
//               unzoomEventType: 'dblclick.zoom'
//           }
//       }
//     };
//
//     var data = {
//         "key" : "Quantity",
//         "bar": true,
//         "values" : [[ 1136005200000 , 1271000.0] , [ 1138683600000 , 1271000.0] , [ 1141102800000 , 1271000.0] , [ 1143781200000 , 0] , [ 1146369600000 , 0] , [ 1149048000000 , 0] , [ 1151640000000 , 0] , [ 1154318400000 , 0] , [ 1156996800000 , 0] , [ 1159588800000 , 3899486.0] , [ 1162270800000 , 3899486.0] , [ 1164862800000 , 3899486.0] , [ 1167541200000 , 3564700.0] , [ 1170219600000 , 3564700.0]]
//     }

// nv.addGraph(function() {
// var chart = nv.models.multiBarChart()
// .transitionDuration(350)
// .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
// .rotateLabels(0)      //Angle to rotate x-axis labels.
// .showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
// .groupSpacing(0.1)    //Distance between each group of bars.
// ;
//
// chart.xAxis
//   .tickFormat(d3.format(',f'));
//
// chart.yAxis
//   .tickFormat(d3.format(',.1f'));
//
// d3.select('#chart1 svg')
//   .datum(test_data)
//   .call(chart);
//
// nv.utils.windowResize(chart.update);
//
// return chart;
// });
//
// test_data = [
//     {
//       values: [{3,10},{3,10}],
//       key: 'some key',
//       color: 'some color'
//     },....
//
//     {
//       values: [{2,25},{2,30}],
//       key: 'some key',
//       color: 'some color'
//     }
// ];


    var options = {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 55
            },
            x: function(d){ return d.label; },
            y: function(d){ return d.value; },
            showValues: true,
            valueFormat: function(d){
                return d3.format(',.4f')(d);
            },
            transitionDuration: 500,
            xAxis: {
                axisLabel: 'X Axis'
            },
            yAxis: {
                axisLabel: 'Y Axis',
                axisLabelDistance: 30
            }
        }
    };

    var data = [{
        key: "Cumulative Return",
        values: [
            { "label" : "sets" , "value" : 3 },
            { "label" : "reps" , "value" : 10 },
            { "label" : "load" , "value" : 135 }
        ]
    }];

    var factory = {
      options: options,
      data: data
    }

    return factory;
}



}());
