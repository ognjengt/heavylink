app.controller('ProfileController', function ($scope, $window, $rootScope, ProfileFactory, jwtHelper, $location) { 
  
  function init() {
    if(!$rootScope.loggedIn) {
      $location.path('/login');
    }
    var tokenPayload = jwtHelper.decodeToken(localStorage.getItem('token'));
    $scope.username = tokenPayload.unique_name;

    ProfileFactory.GetUserLinks($scope.username).then((response) => {
      $scope.userLinks = response.data;
      setTimeout(function() {
        $('[data-toggle="tooltip"]').tooltip();
      },1000)
    })
  }

  init();

})