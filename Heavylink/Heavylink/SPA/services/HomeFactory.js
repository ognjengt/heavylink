app.factory('HomeFactory', function ($http) {
    var factory = {};

    factory.generateGroupLink = function(urls) {
        return $http.post('/api/Links/GenerateGroupLink', {
            Urls: urls
        })
    }
    
    return factory;
})