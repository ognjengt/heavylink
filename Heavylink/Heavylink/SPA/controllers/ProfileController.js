app.controller('ProfileController', function ($scope, $window, $rootScope, ProfileFactory, jwtHelper, $location) { 
  
  function init() {
    if(!$rootScope.loggedIn) {
      $location.path('/login');
    }
    $('[data-toggle="tooltip"]').tooltip();
    var tokenPayload = jwtHelper.decodeToken(localStorage.getItem('token'));
    $scope.username = tokenPayload.unique_name;

    ProfileFactory.GetUserLinks($scope.username).then((response) => {
      $scope.userLinks = response.data;
    })
  }

  init();

})