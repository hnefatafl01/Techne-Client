(function() {
  'use strict';

  angular.module('app.controllers', [])

  .controller('GoalCtrl', function($state, GoalService){
    const vm = this;
    // fake data

    vm.$onInit = function() {
      console.log("goal ctrl onInit");
      GoalService.getGoals()
        .then(function(result){
          vm.goals = result.goals;
        })
    }

    vm.addGoal = function() {
      $state.go('tab.goal-detail');
    }

    vm.viewGoal


    // vm.options = {};
    // vm.data = {};
    // vm.options = {
    //   chart: {
    //     type: 'pieChart',
    //     height: 200,
    //     x: function(d){return d.key;},
    //     y: function(d){return d.y;},
    //     showLabels: true,
    //     duration: 500,
    //     labelThreshold: 0.01,
    //     labelSunbeamLayout: true,
    //     legend: {
    //       margin: {
    //         top: 5,
    //         right: 35,
    //         bottom: 5,
    //         left: 0
    //       }
    //     }
    //   }
    // };
    //
    // vm.data = [
    //   {
    //     key: "One",
    //     y: 5
    //   },
    //   {
    //     key: "Two",
    //     y: 2
    //   },
    //   {
    //     key: "Three",
    //     y: 9
    //   },
    //   {
    //     key: "Four",
    //     y: 7
    //   },
    //   {
    //     key: "Five",
    //     y: 4
    //   },
    //   {
    //     key: "Six",
    //     y: 3
    //   },
    //   {
    //     key: "Seven",
    //     y: .5
    //   }
    // ];
  })

  .controller('GoalDetailCtrl', function($state, GoalService){
    const vm = this;
    vm.createGoal = function() {
      console.log(vm.goal);
      $state.go('tab.goals');
    }
  })

  .controller('ChatsCtrl', function(Chats) {
    const vm = this;
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //.on('$ionicView.enter', function(e) {
    //});

    vm.chats = Chats.all();
    vm.remove = function(chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function($stateParams, Chats) {
    const vm = this;
    vm.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function() {
    const vm = this;
    vm.settings = {
      enableFriends: true
    };
  });


}());
