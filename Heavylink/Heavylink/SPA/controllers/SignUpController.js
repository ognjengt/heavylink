app.controller('SignUpController', function ($scope, $window, $rootScope, AuthFactory, $timeout, $location) { 
  
  function init() {
    if($rootScope.loggedIn) {
      $location.path('/');
    }
    $scope.user = {};
  }

  init();

  $scope.SignUp = function(user) {
    if(!validateEmail(user.email)) {
      alert('Bad mail');
      return;
    }
   if(user.password != user.confirmPassword) {
     alert('Passwords do not match!');
     return;
   }
   AuthFactory.SignUp(user).then((response) => {
     if (response.data) {
      $window.location.href = "/login";
     }
   })
  }

  function validateEmail(email) 
  {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
  }

})