(function() {
  'use strict';

  angular.module("app")
    .config(config)
    .run(function($state, store, $rootScope){
      $rootScope.$on('$stateChangeStart', function(event, to){
        console.log(to.data);
        if(to.data && to.data.requiresLogin) {
          if(!store.get('jwt')) {
            event.preventDefault();
            $state.go('landing')
          }
        }
      })
    })

  function config($stateProvider, $urlRouterProvider, $ionicConfigProvider,$httpProvider, jwtInterceptorProvider, jwtOptionsProvider) {

  $ionicConfigProvider.views.maxCache(0);
  $urlRouterProvider.otherwise('/');
  jwtOptionsProvider.config({ whiteListedDomains: ['http://192.168.0.5:8100/'] });

  jwtInterceptorProvider.tokenGetter = function(store) {
    return store.get('jwt')
  }

  $httpProvider.interceptors.push('jwtInterceptor')

  $stateProvider
  .state('landing', {
    url: '/',
    templateUrl: 'templates/landing.html',
    controller: 'LandingCtrl'
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    data: {
      requiresLogin: true
    }
  })

  //Goals//

  .state('tab.goals', {
    url: '/goal',
    views: {
      'tab-goals': {
        templateUrl: 'templates/tab-goal.html',
        controller: 'GoalCtrl'
      }
    }
  })

  .state('tab.goal-detail', {
    url: '/goal/:goalId',
    views: {
      'tab-goals': {
        templateUrl: 'templates/goal-detail.html',
        controller: 'GoalDetailCtrl'
      }
    }
  })
  //Journal//

  .state('tab.session', {
      url: '/sessions',
      views: {
        'tab-session': {
          templateUrl: 'templates/tab-session.html',
          controller: 'SessionCtrl'
        }
      }
    })
    .state('tab.session-detail', {
      url: '/sessions/:sessionId',
      views: {
        'tab-session': {
          templateUrl: 'templates/session-detail.html',
          controller: 'SessionDetailCtrl'
        },
        resolve: {
          sessionId: ['$stateParams', function($stateParams){
              return $stateParams.sessionId;
          }]
        }
      }
    })

  //Account
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });
  };

}());
