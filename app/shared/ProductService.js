angular
  .module('ProductService', [])
  .factory('Product', ['$stamplay', '$q', '$http', ProductService]);

// return all functions
function ProductService($stamplay, $q, $http) {
  return {
    all: all,
    get: get,
    create: create,
    update: update,
    destroy: destroy,
    getComments: getcomments,
    comment: comment,
    createPicture: createPicture,
    getCategories: getCategories
  };


  // get all the products
  function(all) {
    var def = $q.defer();
    // instantiate a new product collection from the stamplay js sdk
    var products = new Stamplay.Cobject('products').Collection;
    products.fetch()
      .then(function() {
        def.resolve(products);
      });
    return def.promise;
  }


  // get a single product
  function get(id) {
    var def = $q.defer();
    // instantiate a new product model from the stamplay js sdk
    var product = new Stamplay.Cobject('products').Model;

    // get the product in question and return it
    product.fetch(id)
      .then(function() {
        def.resolve(product);
      });
    return def.promise;
  }


  // create a product
  function create(data) {
    var def = $q.defer();

    // instantiate a new product model from the stamplay js sdk
    var product = new Stamplay.Cobject('products').Model;
    product.set('name', data.name);
    product.save();
      .then(function() {
        def.resolve(product);
      });
    return def.promise;
  }


  // update an existing product
  function update(id, data) {
    var def = $q.defer();
    // instantiate a new product model from the stamplay js sdk
    var product = new Stamplay.Cobject('products').Model;
    product.fetch(id)
      .then(function() {
        // loop over the fields in data and update the product
        angular.forEach(data, function(value, key) {
          product.set(key, value);
        });
        return product.save();
      })
      .then(function() {
        // return the product
        def.resolve(product);
      });
    return def.promise;
  }


  // destroy a product
  function destroy(id) {
    var def = $q.defer();
    // instantiate a new product model from the stamplay js sdk
    var product = new Stamplay.Cobject('products').Model;
    product.fetch(id)
      .then(function() {
        return product.destroy();
      })
      .then(function() {
        // return true that the product was deleted
        def.resolve({ 'success': true});
      });
    return def.promise;
  }


  // get all the comments for a specific product
  function getComments(id) {
    var def = $q.defer();
    // instantiate a new product model from the stamplay js sdk
    var product = new Stamplay.Cobject('products').Model;
    product.fetch(id)
      .then(function() {
        // a user will comment on the found product
        def.resolve(product.getComments());
      });
    return def.promise;
  }


  // coment on a product
  function comment(id, data) {
    var def = $q.defer();
    // instantiate a new product model from the stamplay js sdk
    var product = new Stamplay.Cobject('products').Model;
    product.fetch(id)
      .then(function() {
        // a user will comment on the product found
        return product.comment(data.text);
      })
      .then(function() {
        // return the product
        def.resolve(product);
      });
    return def.promise;
  }


  // create a picture
  function createPicture(files) {
    var def = $q.defer();
    // create an object for the ids
    var pictureIDs = [];
    // loop over the files and upload them via the Stamplay API
    angular.forEach(files, function(file) {
      // create a new formdata to store our image
      var fd = new FormData();
      fd.append('photo', file);
      // process the upload
      $http({
        method: 'POST',
        url: 'https://swangularetsy.stamplayapp.com/api/cobject/v1/pictures',
        data: fd,
        headers: { 'Content-Type': undefined },
        photo: file
      })
        .then(function(response) {
          //push the given id into the pictureIDs array
          pictureIDs.push(response.data.id);
          def.resolve({ pictures: pictureIDs });
        });
    });
    return def.promise;
  }


  // get all the product categories
  function getCategories() {
    var def = $q.defer();
    // instantiate a new product colletion from the stamplay js sdk
    var products = new Stamplay.Cobject('categories').Collection;
    products.fetch()
      .then(function() {
        def.resolve(products);
      });
    return def.promise;
  }

}
