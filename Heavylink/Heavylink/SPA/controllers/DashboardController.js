app.controller('DashboardController', function ($scope, $window, $rootScope) { 
  
  function init() {
    if($rootScope.token == null) {
      $window.location.href = '/login';
    }
  }

  init();

  
})