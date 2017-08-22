app.controller('ProfileController', function ($scope, $window, $rootScope, ProfileFactory, jwtHelper) { 
  
  function init() {
    if($rootScope.token == null) {
      $window.location.href = '/login';
    }
    
    var tokenPayload = jwtHelper.decodeToken(localStorage.getItem('token'));
    $scope.username = tokenPayload.unique_name;

    ProfileFactory.GetUserLinks($scope.username).then((response) => {
      $scope.userLinks = response.data;
    })
  }

  init();

})