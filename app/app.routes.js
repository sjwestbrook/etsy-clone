angular
  .module('app.routes', [])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', AppRoutes]);

/* Create all the application routes */

function AppRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
   // pretty angular urls
   $locationProvider.html5Mode(true);

   // the route people are sent to when they are lost (try to access a route that doesn't exist)
   // the home page in this case
   $urlRouterProvider.otherwise('/');

   // create our routes, set the view, pull in the controller
   $stateProvider
      // home page
      .state('home', {
        url: '/',
        templateUrl: '/app/components/home/home.html',
        controller: 'HomeController as home'
      })

      // shop page
      .state('shop', {
        url: '/shop/{name}',
        templateUrl: '/app/components/shop/shop.html',
        controller: 'ShopController as shop'
      })

      // product page (a child of shop)
      .state('product', {
        url: '/listing/{id}/{name}',   // We’re setting two URL parameters on product because we don’t want to limit product name to be unique (multiple users should be able to create the same product name) and we’re going to use the id since that will always be unique.
        templateUrl: '/app/components/product/product.html',
        controller: 'ProductController as product'
      })

      // login/signup page
      .state('authenticate', {
        url: '/authenticate',
        templateUrl: '/app/components/authenticate/authenticate.html',
        controller: 'AuthenticateController as authenticate'
      })

      // profile page
      .state('profile', {
        url: '/profile/{user_name}',
        templateUrl: '/app/components/profile/profile.html',
        controller: 'ProfileController as profile'
      })

      // checkout page
      .state('checkout', {
        url: '/checkout/{id}',
        templateUrl: '/app/components/checkout/checkout.html',
        controller: 'CheckoutController as checkout'
      })

      // checkout page
      .state('admin', {
        url: '/admin',
        templateUrl: '/app/components/admin/admin.html',
        controller: 'AdminController as admin'
      });
}
