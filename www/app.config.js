(function() {
  'use strict';

  angular.module("app")
    .config(config);
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  function config($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);
  $stateProvider
  // setup an abstract state for the tabs directive
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

  .state('tab.journal', {
      url: '/journal',
      views: {
        'tab-journal': {
          templateUrl: 'templates/tab-journal.html',
          controller: 'JournalCtrl'
        }
      }
    })
    .state('tab.journal-detail', {
      url: '/journal/:journalId',
      views: {
        'tab-journal': {
          templateUrl: 'templates/journal-detail.html',
          controller: 'JournalDetailCtrl'
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
  $urlRouterProvider.otherwise('/tab/goal');
  };

}());
