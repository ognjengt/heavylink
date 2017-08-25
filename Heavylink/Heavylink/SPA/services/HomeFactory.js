app.factory('HomeFactory', function ($http) {
    var factory = {};

    factory.generateGroupLink = function(data) {
        return $http.post('/api/Links/GenerateGroupLink', {
            Urls: data.urls,
            Author: data.username,
            Title: data.title
        })
    }

    factory.GetRecentLinks = function() {
        return $http.get('/api/Links/GetRecent');
    }
    
    return factory;
})