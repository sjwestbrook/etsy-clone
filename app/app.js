angular.module ('etsyApp', [
  'ngStamplay',
  'ui.router',
  'ngFileUPload',
  'app.routes',
  'app.admin',
  'app.authenticate',
  'app.checkout',
  'app.home',
  'app.product',
  'app.profile',
  'app.shop',
  'UserService',
  'ProductService'
])
.controller('MainController', ['User', '$rootScope', MainController]);


/*
  The main controller for our application.
  We are also grabbing $rootScope so that we can bind the logged in user to that and have it usable across our application.
*/

function MainController(User, $rootScope) {
  var main = this;
  $rootScope.currentUser = {}; // creating this object to hold our current user's info

  // get the current user and bind their data to $rootScope.currentUser object
  User.getCurrent()
    .then(function(data) {
      if (data.get('_id')) {
        $rootScope.currentUser.id = data.get('_id');
        $rootScope.currentUser.name = data.get('displayName');
        $rootScope.currentUser.image = data.get('profileImg');
      }
      else {
        // clear the current user just to be sure
        $rootScope.currentUser = {};
      }
    });

    // use the user factory's logout functionality
    function logout() {
      User.logout();
      $rootScope.currentUser = {};
    }
}
