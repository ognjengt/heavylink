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
        iziToast.show({
          title: 'That user does not exist',
          position: 'topLeft',
          theme: 'light',
          color: 'red',
          icon: 'ion ion-close',
          transitionIn: 'fadeIn'
        });
      }
      else if(response.data == "Wrong credentials") {
        iziToast.show({
          title: 'Wrong credentials.',
          position: 'topLeft',
          theme: 'light',
          color: 'red',
          icon: 'ion ion-close',
          transitionIn: 'fadeIn'
        });
      }
      else {
        localStorage.setItem("token",response.data);
        $window.location.href = '/';
      }
    })
  }
  
})