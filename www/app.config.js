(function() {
  'use strict';

  angular.module("app")
    .config(config);
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  function config($stateProvider, $urlRouterProvider) {
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

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
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
