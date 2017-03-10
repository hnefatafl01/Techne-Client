angular.module('app.controllers', [])

.controller('DashCtrl', function(){
  const vm = this;
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
