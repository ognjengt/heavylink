app.controller('ProfileController', function ($scope, $window, $rootScope, ProfileFactory, jwtHelper, $location, $timeout) { 
  
  function init() {
    if(!$rootScope.loggedIn) {
      $location.path('/login');
    }
    var tokenPayload = jwtHelper.decodeToken(localStorage.getItem('token'));
    $scope.username = tokenPayload.unique_name;

    ProfileFactory.GetUserLinks($scope.username).then((response) => {
      $scope.userLinks = response.data;
      // hide loader
      $('.profile-loader').hide();
      $timeout(function() {
        $('[data-toggle="tooltip"]').tooltip();
      },100)
    })
  }

  init();

})