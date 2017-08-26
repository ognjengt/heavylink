app.factory('HomeFactory', function ($http) {
    var factory = {};

    factory.generateGroupLink = function(data) {
        return $http.post('/api/Links/GenerateGroupLink', {
            Urls: data.urls,
            Title: data.title
        },{
            headers:{
                'Authorization' : 'Bearer '+localStorage.getItem('token') || 'null'
            }
        })
    }

    factory.GetRecentLinks = function() {
        return $http.get('/api/Links/GetRecent');
    }
    
    return factory;
})