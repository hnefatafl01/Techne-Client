(function() {
  'use strict';

  angular.module('app.controllers', ['nvd3'])

  .controller('LandingCtrl', function($state, LandingService){
    console.log('hello landing control');
    const vm = this;

    vm.signin = function() {
      LandingService.getUser(vm.user)
        .then(function(){
            $state.go('tab.goals')
        })

    }

    vm.signup = function() {
      vm.newUser = {
        username: vm.newUser.username,
        email: vm.newUser.email,
        password: vm.newUser.password
      }
      LandingService.createNewUser(vm.newUser)
        .then(function(){
          console.log('newUser');
          $state.go('tab.goals')
        })
    }
  })

  .controller('GoalCtrl', function($state, GoalService, ChartFactory, SessionService){
    const vm = this;

    vm.$onInit = function() {
      ////TODO: modal.show() to open modal with click etc.

      GoalService.getGoals()
        .then(function(result){
          vm.goals = result.goals;
        })

      vm.options = ChartFactory.options;
      // vm.data = ChartFactory.data;


      SessionService.getSessions()
        .then((result) => {
          var sessions = result.sessions;
          // console.log(sessions);
          var dateF,vol,set,load,repetitions

          var formattedSessions = sessions.map((session,index) => {
            dateF = Date.parse(session.date)
            var exerciseVolumes = session.exercises.map((exercise,index) => {
              set = exercise.sets
              load = exercise.load
              repetitions = exercise.repetitions
              vol = volumeFn(set,repetitions,load);
              return vol;
            })

            var total = exerciseVolumes.reduce(function(sum, current){
               return sum + current;
             }, 0);
            //  console.log(total);
            return {
              date: dateF,
              volumeF: total
            }
          })

          function volumeFn(s,r,l) { var vol = s * r * l; return vol; }
          // console.log(formattedSessions);
          return formattedSessions.map((obj)=>{
            return [obj.date, obj.volumeF]
          })


        }).then((session)=>{
          // console.log(session);
          vm.data = [
            {
              "key" : "Quantity" ,
              "bar": true,
              "values" : session
            }
          ];
          console.log(vm.data);
        })






        //filter for exercise name to match with goal
          //var name = 'string1 etc'
          // var obj = array.filter(function ( obj ) {
          // return obj.name === name;
// })[0];
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
        })
    }

    vm.newTrainingLog = function() {
      vm.session.date = new Date();
      let session = vm.session;
      SessionService.postSession(session)
        .then(function(result){
            return result.session;
        })
        $state.reload();
    }

  })

  .controller('SessionDetailCtrl', function(SessionService, $state, $stateParams, ExerciseService) {
    const vm = this;

    vm.$onInit = function(event, viewData) {
      let sessionId = $stateParams.sessionId;

      SessionService.getSessionWithExercises(sessionId)
        .then((result) => {
          vm.session = result.session;
          return vm.session;
        })
    }

    vm.createExercise = function(){
      let sessionId = $stateParams.sessionId;
      let exercise = vm.session.exercise;
      SessionService.addExercisesToSession(sessionId, exercise)
        .then(function(result){
          vm.session = result;
          return vm.session;
        })
        .then(()=>{
          $state.reload();
        })
      delete vm.exercise;
    }

    vm.submitSession = function() {
      let session = vm.session;
      let id = session.id;
      // console.log(session.id);
      SessionService.updateSession(id, session)
        .then(function(session){
          vm.session = session;
          // $state.go('tab.session');
          // $state.go('');
        })
    }

    vm.deleteExercise = function(index){
      let id = vm.session.exercises[index].id;
      SessionService.deleteExerciseFromSession(id)
        .then((result) => {
          console.log(result.data);
          return result;
        }).then(function(){
            $state.reload();
        })
    }

  })

  .controller('AccountCtrl', function() {
    const vm = this;
    vm.settings = {
      enableFriends: true
    };
  });

}());
