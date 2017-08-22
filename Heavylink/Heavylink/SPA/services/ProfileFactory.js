app.factory('ProfileFactory', function ($http) {
  var factory = {};

  factory.GetUserLinks = function(username) {
    return $http({
      method: 'GET',
      url: '/api/Links/GetUserLinks?username='+username,
      headers: {
          'Authorization' : 'Bearer '+localStorage.getItem('token')
      }
  })

  }
  
  return factory;
})