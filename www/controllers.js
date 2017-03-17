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

  .controller('JournalCtrl', function($state, JournalService) {
    const vm = this;
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //.on('$ionicView.enter', function(e) {
    //});
    vm.$onInit = function() {
      JournalService.getSessions()
        .then(function(result){
          console.log(result.sessions);
          vm.sessions = result.sessions;
        })
    }

    vm.createExercise = function(){
      console.log('createExercise');
    }
    vm.newTrainingLog = function() {
      console.log('new entry');
      $state.go('tab.journal-detail')
    }

    // vm.jouranls = Journals.all();
    // vm.remove = function(journal) {
    //   Journals.remove(journal);
    // };
  })

  .controller('JournalDetailCtrl', function($stateParams) {
    const vm = this;
    // vm.journal = Journals.get($stateParams.journalId);
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
