angular
  .module('UserService', [])
  .factory('User', ['$stamplay', '$q', UserService]);

function UserService($stamplay, $q) {

  // return an object with all our functions
  return {
    getCurrent: getCurrent,
    signup: signup,
    login: login,
    logout: logout
  };

  // get the current logged in user
  function getCurrent() {
    var def = $q.defer();
    // instantiate a new user model from the stamplay js sdk
    var user = $stamplay.User().Model;
    user.currentUser()
        .then(function() {
          // send the entire user model background
          def.resolve(user);
        });
    return def.promise;
  }


  // register a user with their name, email, and password
  function signup(data) {
    var def = $q.defer();
    // instantiate a new user model from the stamplay js sdk
    var user = $stamplay.User().Model;
    user.signup(data)
        .then(function() {
          // send the entire user model back
          def.resolve(user);
        })
    return def.promise;
  }


  // log a user in with their email and password
  function login(data) {
    var def = $q.defer();
    var user = $stamplay.User().Model;
    user.login(data.email, data.password)
        .then(function() {
          // send the entire user model back
          def.resolve(user);
        }, function() {
          def.reject({'error': 'Unable to login user.' });
        });
    return def.promise;
  }


  // log the current user out
  // will also redirect the browser to the logout url (home)
  function logout() {
    var user = $stamplay.User().Model;
    user.logout();
  }
}
