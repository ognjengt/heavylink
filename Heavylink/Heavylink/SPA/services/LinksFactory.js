app.factory('LinksFactory', function ($http) {
    var factory = {};

    factory.getLinksForThisUrl = function(code) {
      return $http.get('/api/Links/GetLinksForThisUrl?code='+code);
    }
    
    return factory;
})