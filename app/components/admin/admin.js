angular
  .module('app.admin', [])
  .controller('AdminController', ['Product', AdminController]);

function AdminController(Product) {   // injecting the Product factory and creating a function to create the product
  var admin = this;
  admin.productData = {};    // the object to hold the data from our form

  // bind the create product function to the controller
  admin.createProduct = createProduct;


  // Get all the product categories so we can show them in our form
  Product.getCategories()
    .then(function(data) {
      admin.categories = data.instance;
    });


    // create a new Product
    function createProduct() {
      Product.create(admin.productData)
        .then(function(data) {
          // clear the form
          admin.productData = {};

          // show a message that the product was succesfully created
          // show a link to view that product
          admin.successMessage = 'Product created!';
          admin.newProductId = data.get('_id');
          admin.newProductName = data.get('name');
        });
    }


    // loop over the files being uploaded, save them to Stamplay
    // store the ids into admin.productData.pictures
    function uploadFiles(files) {
      //use our product service to pass the files to Stamplay
      Product.createPicture(files)
        .then(function(data) {
          // add the pictures array to our productData
          admin.productData.pictures = data.pictures;
        });
    }

}
