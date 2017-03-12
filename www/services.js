(function() {
  'use strict';

  const SERVER_URL = 'http://localhost:5000';

  angular.module('app.services', [])
    .service('GoalService', service)

    function service($http) {
      const vm = this;
      // console.log('services module');
      vm.getGoals = function() {
        return $http.get(`${SERVER_URL}/goals`).then(function(result) {
          console.log('get goals');
          console.log(result.data);
          return result.data;
        })
      }
    }

}());
