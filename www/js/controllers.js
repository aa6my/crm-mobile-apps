/**

  +-+-+-+-+ +-+-+-+-+-+
  |S|E|G|I| |M|i|D|a|e|
  +-+-+-+-+ +-+-+-+-+-+

 * Customer Relationship Management [CRM]
 *
 * http://www.segimidae.net
 *
 * PHP version 5
 *
 * @category   js
 * @package    controllers.js
 * @author     Nizam <nizam@segimidae.net>
 * @author     Norlihazmey <norlihazmey@segimidae.net>
 * @author     Azim <azim@segimidae.net>
 * @license    http://opensource.org/licenses/MIT
 * @copyright  2014 SEGI MiDae
 * @version    0.4.1
*/
angular.module('starter.controllers', [])

.factory('Settings', function() {
  return {
      upload : 'https://192.168.0.200/customer-relationship-management/assets/uploads/files/',
      url : 'https://192.168.0.200/customer-relationship-management/apps'
  };
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

// vendor
.controller('Vendor', 
    function($scope, $http, Settings) {
        $http.get(Settings.url + '/dataAll/type/vendors/format/json').
        success(function(data) {
          $scope.vendors = data.vendors;
          console.log('Success', data.vendors);
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})
//end of vendor

// lead
.controller('Lead', 
    function($scope, $http, Settings) {
        $http.get(Settings.url + '/dataAll/type/leads/format/json').
        success(function(data) {
          $scope.leads = data.leads;
          console.log('Success', data.leads);
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})
//end of lead

// customer
.controller('Customer', 
    function($scope, $http, Settings) {
        $http.get(Settings.url + '/dataAll/type/customers/format/json').
        success(function(data) {
          $scope.customers = data.customers;
          console.log('Success', data.customers);
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})
//end of customer

// product
.controller('Product', 
    function($scope, $http, Settings) {
        $http.get(Settings.url + '/dataAll/type/products/format/json').
        success(function(data) {
          $scope.products = data.products;
          console.log('Success', data.products);
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})
//end of product

// quote
.controller('Quote', 
    function($scope, $http, Settings) {
        $http.get(Settings.url + '/dataAll/type/quotes/format/json').
        success(function(data) {
          $scope.quotes = data.quotes;
          console.log('Success', data.quotes);
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})
//end of quote

// website
.controller('Website', 
    function($scope, $http, Settings) {
        $http.get(Settings.url + '/dataAll/type/websites/format/json').
        success(function(data) {
          $scope.websites = data.websites;
          console.log('Success', data.websites);
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})
//end of website

// job
.controller('Job', 
    function($scope, $http, Settings) {
        $http.get(Settings.url + '/dataAll/type/jobs/format/json').
        success(function(data) {
          $scope.jobs = data.jobs;
          console.log('Success', data.jobs);
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })      
})
//end of website

//invoice
.controller('Invoice', 
    function($scope, $http, Settings) {
        $http.get(Settings.url + '/dataAll/type/invoices/format/json').
        success(function(data) {
          $scope.invoices = data.invoices;
          console.log('Success', data.invoices);
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})
//end of website

//file
.controller('File', 
    function($scope, $http, Settings) {
        $http.get(Settings.url + '/dataAll/type/files/format/json').
        success(function(data) {
          $scope.upload = Settings.upload;
          $scope.files = data.files;
          console.log('Success', data.files);
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
});

// .controller('PlaylistCtrl', function($scope, $stateParams) {
// });
