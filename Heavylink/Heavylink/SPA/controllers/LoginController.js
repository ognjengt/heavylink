app.controller('LoginController', function ($scope, $window, $rootScope, AuthFactory, $location) { 
  
  function init() {
    if($rootScope.loggedIn) {
      $location.path('/');
      //$window.location.href = "/";
    }
    $scope.user = {};
  }

  init();

  $scope.Login = function(user) {
    AuthFactory.Login(user).then((response) => {
      if(response.data == "User does not exist") {
        alert('User does not exist, btw find a finer way for popup msgs');
      }
      else if(response.data == "Wrong credentials") {
        alert('Wrong credentials, btw find a finer way for popup msgs');
      }
      else {
        localStorage.setItem("token",response.data);
        $window.location.href = '/';
      }
    })
  }
  
})