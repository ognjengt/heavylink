app.factory('AuthFactory', function ($http) {
  var factory = {};

  factory.SignUp = function(user) {
    return $http.post('/api/Auth/SignUp', {
      Email: user.email,
      Username: user.username,
      Password: user.password
    })
  }

  factory.Login = function(user) {
    return $http.post('/api/Auth/Login',{
      Email: user.email,
      Password: user.password
    })
  }
  
  return factory;
})