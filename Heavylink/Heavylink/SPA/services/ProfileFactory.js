app.factory('ProfileFactory', function ($http) {
  var factory = {};

  factory.GetUserLinks = function(username) {
    return $http.get('/api/Links/GetUserLinks?username='+username);
  }
  
  return factory;
})