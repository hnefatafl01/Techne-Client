(function() {
  'use strict';

  angular.module('app.controllers', ['nvd3','angular-storage'])

  .controller('LandingCtrl', function($state, LandingService, store){
    const vm = this;

    vm.$onInit = function() {
      vm.showSignup = false;
      vm.showSignin = false;
    }

    vm.signin = function() {
      LandingService.login(vm.user)
        .then(function(response){
          store.set('jwt', response.id_token)
          $state.go('tab.goals')
        }), function(response){
            alert(response.data)
        }
    }

    vm.signup = function() {
      vm.newUser =
      {
        username: vm.newUser.username,
        email: vm.newUser.email,
        password: vm.newUser.password
      }
      let user = vm.newUser
      LandingService.createNewUser(user)
        .then(function(response){
          store.set('jwt', response.id_token)
          $state.go('tab.goals')
        }), function(response){
            alert(response.data)
        }
    }
  })

  .controller('GoalCtrl', function($state, GoalService, ChartFactory, SessionService, store, jwtHelper){
    const vm = this;
    vm.jwt = store.get('jwt')
    vm.decodedJwt = vm.jwt && jwtHelper.decodeToken(vm.jwt);
    vm.$onInit = function() {
      let userId = vm.decodedJwt.user.id;

      GoalService.getGoals(userId)
        .then(function(result){
          vm.goals = result.UserGoals[0].goals;
        })

      vm.options = ChartFactory.options;
      // vm.data = ChartFactory.data;

      SessionService.getSessions(userId)
        .then((result) => {
          var sessions = result.sessions;
          var dateF,vol,set,load,repetitions
          var formattedSessions = sessions.map((session,index) => {
            dateF = Date.parse(session.date)
            // console.log(dateF);

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
              date: dateF
              ,
              volumeF: total
            }
          })

          function volumeFn(s,r,l) { var vol = s * r * l; return vol; }
          // console.log(formattedSessions);
          return formattedSessions.map((obj) => {
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
          // console.log(vm.data);
        })
    }

    vm.addGoal = function() {
      $state.go('tab.goal-detail');
    }

    vm.displayGoalProgress = function() {
      // console.log("show me this goals status");
    }

    vm.styleStatus = function() {
      // console.log('removeClass');
      //fix hover
      // angular.element( document.querySelector( '#goalStatus' ) ).removeClass("ion-ios-pulse");
      // var myEl = angular.element( document.querySelector( '#goalStatus' ) )
      //
      // myEl.addClass("ion-ios-pulse-strong");
    }
  })

  .controller('GoalDetailCtrl', function($state, GoalService, store, jwtHelper){
    const vm = this;
    vm.jwt = store.get('jwt')
    vm.decodedJwt = vm.jwt && jwtHelper.decodeToken(vm.jwt);

    vm.createGoal = function() {
      let userId = vm.decodedJwt.user.id;
      GoalService.postGoal(userId, vm.goal)
      .then(function(result){
        // console.log('goal created', result);

        // $state.go('tab.goals');
        $state.transitionTo('tab.goals', null, {reload: true, notify:true});
      })
    }
  })

  .controller('SessionCtrl', function($state, $stateParams, SessionService, store, jwtHelper) {
    const vm = this;
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //.on('$ionicView.enter', function(e) {
    //});
    vm.jwt = store.get('jwt')
    vm.decodedJwt = vm.jwt && jwtHelper.decodeToken(vm.jwt);
    // console.log(vm.jwt);
    // console.log(vm.decodedJwt);
    // console.log(vm.decodedJwt.user.id);

    vm.$onInit = function() {
      let userId = vm.decodedJwt.user.id;
      SessionService.getSessions(userId)
        .then(function(result){
          vm.sessions = result.sessions;
          // console.log('vm.sessions', vm.sessions);
        })
    }

    vm.newTrainingLog = function() {
      vm.session.date = new Date();
      let session = vm.session;
      let userId = vm.decodedJwt.user.id;
      SessionService.postSession(userId, session)
        .then(function(result){
           return result.session;
        }).then(function(){
          $state.transitionTo('tab.session', null, {reload: true, notify:true});
        })
    }
  })

  .controller('SessionDetailCtrl', function(SessionService, $state, $stateParams, ExerciseService,store,jwtHelper) {
    const vm = this;
    vm.jwt = store.get('jwt')
    vm.decodedJwt = vm.jwt && jwtHelper.decodeToken(vm.jwt);

    vm.$onInit = function(event, viewData) {
      let sessionId = $stateParams.sessionId;
      let userId = vm.decodedJwt.user.id;
      SessionService.getSessionWithExercises(userId, sessionId)
        .then((result) => {
          vm.session = result.session;
          return vm.session;
        })
    }

    vm.createExercise = function(){
      let sessionId = $stateParams.sessionId;
      let exercise = vm.session.exercise;
      let userId = vm.decodedJwt.user.id;

      SessionService.addExercisesToSession(userId, sessionId, exercise)
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
      SessionService.updateSession(id, session)
        .then(function(session){
          vm.session = session;
          // $state.go('tab.session');
          // $state.go('');
        })
    }

    vm.deleteExercise = function(index){
      let sessionId = vm.session.id;
      let userId = vm.decodedJwt.user.id;
      let eid = vm.session.exercises[index].id;
      SessionService.deleteExerciseFromSession(userId, sessionId, eid)
        .then((result) => {
          console.log('deleted',result);
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
