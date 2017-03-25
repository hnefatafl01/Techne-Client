(function() {
  'use strict';

  angular.module("app")
    .config(config);

  // Learn more here: https://github.com/angular-ui/ui-router


  function config($stateProvider, $urlRouterProvider, $ionicConfigProvider,$httpProvider, jwtInterceptorProvider,jwtOptionsProvider) {
  $ionicConfigProvider.views.maxCache(0);

  jwtOptionsProvider.config({ whiteListedDomains: ['http://192.168.0.5:8100/'] });

  jwtInterceptorProvider.tokenGetter = function(store) {
    return store.get('jwt')
  }

  $httpProvider.interceptors.push('jwtInterceptor')

  $stateProvider
  // setup an abstract state for the tabs directive
  .state('landing', {
    url: '/',
    templateUrl: 'templates/landing.html',
    controller: 'LandingCtrl'
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
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

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
  };

}());
