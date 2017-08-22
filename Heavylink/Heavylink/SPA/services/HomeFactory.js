app.factory('HomeFactory', function ($http) {
    var factory = {};

    factory.generateGroupLink = function(urls, username) {
        return $http.post('/api/Links/GenerateGroupLink', {
            Urls: urls,
            Author: username
        })
    }
    
    return factory;
})