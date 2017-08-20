var app = angular.module('app', ['ngRoute','ngAnimate', 'ngclipboard']);

app.config(function ($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
        controller: 'HomeController',
        templateUrl: 'SPA/partials/home.html'
    }).when('/login', {
        controller: 'LoginController',
        templateUrl: 'SPA/partials/login.html'
    }).when('/signup', {
        controller: 'SignUpController',
        templateUrl: 'SPA/partials/signup.html'
    }).when('/:generatedUrl', {
        controller: 'LinkController',
        templateUrl: 'SPA/partials/generatedUrl.html'
    })

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
});
