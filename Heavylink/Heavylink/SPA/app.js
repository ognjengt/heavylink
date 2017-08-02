var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
        controller: 'HomeController',
        templateUrl: 'SPA/partials/home.html'
    }).when('/:generatedUrl', {
        controller: 'LinkController',
        templateUrl: 'SPA/partials/generatedUrl.html'
    })

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
});
