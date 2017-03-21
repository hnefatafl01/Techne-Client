(function() {
  'use strict';

  angular.module('app.controllers', ['nvd3'])
  // TODO: inject me! journalService
  .controller('GoalCtrl', function($state, GoalService, ChartFactory){
    const vm = this;

    vm.$onInit = function() {
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
      vm.session = {};
      vm.session.date = new Date();
      // vm.session.duration = ;
      let session = vm.session;
      // console.log('session create', session);
      SessionService.newSession(session)
        .then(function(result){
          vm.session = result.session;
          // console.log('vmsession', vm.session);
        })
        // .then(function(){
        //   SessionService.getSessions()
        //   .then(function(result){
        //     vm.sessions = result.sessions;
        //     console.log('vm.sessions',vm.sessions);
        //   })
        // })
    }

  })

  .controller('SessionDetailCtrl', function(SessionService,$state, $stateParams, ExerciseService) {
    const vm = this;

    vm.$onInit = function() {
      let sessionId = $stateParams.sessionId;
        SessionService.getSessionWithExercises(sessionId)
          .then((result) => {
            console.log(result.session);
            vm.session = result.session;
            return vm.session;
          })
    }

    vm.createExercise = function(){
      let sessionId = $stateParams.sessionId;
      let exercise = vm.session.exercise;
      SessionService.addExercisesToSession(sessionId, exercise)
        .then(function(result){
          console.log(result);
          vm.session = result;
          return vm.session;
        })
        .then(()=>{
          $state.transitionTo('tab.session-detail', null, {reload: true, notify:true});
        })
      // delete vm.exercise;
    }

    vm.submitSession = function() {
      // vm.session.exercises = vm.tempExerciseArray;
      // let sessionId = $stateParams.sessionId;
      // console.log('id',sessionId);
      // console.log('submit session', vm.session);
      // let exercises = vm.session.exercises;
      // let session = vm.session;
      // console.log('session update', session);
      // SessionService.updateSessionWithExercises(sessionId, session)

        // .then(function(session){
        //   console.log('promise',session);
        // })
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
