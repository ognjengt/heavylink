app.factory('HomeFactory', function ($http) {
    var factory = {};

    factory.generateGroupLink = function(data) {
        return $http.post('/api/Links/GenerateGroupLink', {
            Urls: data.urls,
            Author: data.username,
            Title: data.title
        })
    }
    
    return factory;
})