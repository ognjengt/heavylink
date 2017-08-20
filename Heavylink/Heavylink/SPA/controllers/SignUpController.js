app.controller('SignUpController', function ($scope, $window, $rootScope, AuthFactory, $timeout) { 
  
  function init() {
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
      console.log('Successfully registered, redirecting to login page in 3 seconds');
       $timeout(function() {
         $window.location.href = "/login";
       },3000)
     }
   })
  }

  function validateEmail(email) 
  {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
  }

})