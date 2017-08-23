app.factory('LinksFactory', function ($http) {
    var factory = {};

    factory.getLinksForThisUrl = function(code) {
      return $http.get('/api/Links/GetLinksForThisUrl?code='+code);
    }

    factory.changeLinkTitle = function(id, newTitle) {
      return $http.post('/api/Links/ChangeLinkTitle',{
        Id: id,
        Title: newTitle
      }, {
        headers:{
          'Authorization' : 'Bearer '+localStorage.getItem('token')
        }
      })
    }

    factory.UpdateSettings = function(settings) {
      return $http.post('/api/Links/UpdateSettings',{
        Id: settings.id,
        Private: settings.private
      }, {
        headers: {
          'Authorization' : 'Bearer '+localStorage.getItem('token')
        }
      })
    }
    
    return factory;
})