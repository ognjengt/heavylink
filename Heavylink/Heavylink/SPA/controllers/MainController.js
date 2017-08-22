app.controller('MainController', function ($scope, $window, $rootScope) {

    function init() {
        $rootScope.token = localStorage.getItem('token');
    }

    init();

    $scope.Logout = function() {
        localStorage.removeItem('token');
        $window.location.href = '/login';
        $rootScope.token = null;
    }
})