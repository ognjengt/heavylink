app.controller('LoginController', function ($scope, $window, $rootScope, AuthFactory) { 
  
  function init() {
    $scope.user = {};
  }

  init();

  $scope.Login = function(user) {
    AuthFactory.Login(user).then((response) => {
      console.log(response.data);
    })
  }
  
})