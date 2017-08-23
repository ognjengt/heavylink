app.controller('MainController', function ($scope, $window, $rootScope, jwtHelper) {

    $rootScope.token = localStorage.getItem('token');
    if($rootScope.token) {
        $rootScope.loggedIn = true;
        $rootScope.username = jwtHelper.decodeToken(localStorage.getItem('token')).unique_name;
    }
    else {
        $rootScope.loggedIn = false;
        $rootScope.username = "anon";
    }

    $scope.Logout = function() {
        localStorage.removeItem('token');
        $rootScope.token = null;
        $window.location.href = '/login';
    }
})