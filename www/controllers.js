(function() {
  'use strict';

  angular.module('app.controllers', ['nvd3'])
  // TODO: inject me! journalService
  .controller('GoalCtrl', function($state, GoalService, ChartFactory){
    const vm = this;

    vm.$onInit = function() {
      console.log("goal ctrl onInit");
      GoalService.getGoals()
        .then(function(result){
          vm.goals = result.goals;
        })
      vm.options = ChartFactory.options;
      vm.data = ChartFactory.data;
    }

    vm.addGoal = function() {
      $state.go('tab.goal-detail');
    }

    vm.displayGoalProgress = function() {
      console.log("show me this goals status");
    }

    vm.styleStatus = function() {
      console.log('removeClass');
      //fix hover
      // angular.element( document.querySelector( '#goalStatus' ) ).removeClass("ion-ios-pulse");
      // var myEl = angular.element( document.querySelector( '#goalStatus' ) )
      //
      // myEl.addClass("ion-ios-pulse-strong");
    }
  })

  .controller('GoalDetailCtrl', function($state, GoalService){
    const vm = this;
    vm.createGoal = function() {
      vm.newGoal = {
        exercise_name: vm.goal.exercise,
        reps: vm.goal.repetitions,
        load: vm.goal.load,
        finish_date: vm.goal.goalFinishDate
      }
      GoalService.postGoal(vm.newGoal)
      .then(function(){
        // $state.go('tab.goals');
        $state.transitionTo('tab.goals', null, {reload: true, notify:true});
      })
    }
  })

  .controller('SessionCtrl', function($state, $stateParams, SessionService) {
    const vm = this;
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //.on('$ionicView.enter', function(e) {
    //});
    vm.$onInit = function() {
      SessionService.getSessions()
        .then(function(result){
          vm.sessions = result.sessions;
          // console.log(vm.sessions);
        })
    }


    vm.newTrainingLog = function() {
      console.log('new entry');
      // $state.go('tab.journal-detail')
    }

  })

  .controller('SessionDetailCtrl', function(SessionService, $stateParams) {
    const vm = this;

    vm.$onInit = function() {
      vm.tempExerciseArray = [];
      let sessionId = $stateParams.sessionId;
      SessionService.getSession(sessionId)
        .then(function(session) {
          vm.session = session.session;
          // console.log(vm.session);
        })
    }

    vm.createExercise = function(){
      vm.tempExerciseArray.push(vm.exercise)
      // console.log(vm.exercise);
      // console.log(vm.tempExerciseArray);
      console.log(vm.session);
      vm.session.exercises = vm.session.exercises.concat(vm.tempExerciseArray);
      console.log(vm.session.exercises);
      delete vm.exercise;
    }

    vm.deleteExercise = function(){
      console.log('delete this exercise');
    }

  })

  .controller('AccountCtrl', function() {
    const vm = this;
    vm.settings = {
      enableFriends: true
    };
  });

}());
