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
      iziToast.show({
        title: 'Bad email format',
        message: 'Please enter the email in the correct format.',
        position: 'topLeft',
        theme: 'light',
        color: 'red',
        icon: 'ion ion-close',
        transitionIn: 'fadeIn'
      });
      return;
    }
   if(user.password != user.confirmPassword) {
    iziToast.show({
      title: 'Passwords do not match!',
      position: 'topLeft',
      theme: 'light',
      color: 'red',
      icon: 'ion ion-close',
      transitionIn: 'fadeIn'
    });
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