angular
  .module('app.home', [])
  .controller('HomeController', ['Product', HomeController]);

function HomeController(Product) {
  var home = this;

  // get all the products and bind them to home.products
  Product.all()
    .then(function(data) {
      home.products = data.instance;   // With all the products bound to home.products, we can ng-repeat over them in the home.html file.
    });
}
