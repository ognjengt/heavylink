var app = angular.module('app', ['ngRoute','ngAnimate', 'ngclipboard','angular-jwt']);

app.config(function ($routeProvider, $locationProvider, jwtInterceptorProvider, $httpProvider) {

    $routeProvider.when('/', {
        controller: 'HomeController',
        templateUrl: 'SPA/partials/home.html'
    }).when('/login', {
        controller: 'LoginController',
        templateUrl: 'SPA/partials/login.html'
    }).when('/signup', {
        controller: 'SignUpController',
        templateUrl: 'SPA/partials/signup.html'
    }).when('/dashboard', {
        controller: 'DashboardController',
        templateUrl: 'SPA/partials/dashboard.html'
    }).when('/profile', {
        controller: 'ProfileController',
        templateUrl: 'SPA/partials/profile.html'
    }).when('/:generatedUrl', {
        controller: 'LinkController',
        templateUrl: 'SPA/partials/generatedUrl.html'
    })

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
});
