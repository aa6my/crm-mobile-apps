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
      upload : 'https://localhost/customer-relationship-management/assets/uploads/files/',
      url : 'https://localhost/customer-relationship-management/apps'
  };
})

.config(['$httpProvider', function($httpProvider, $http) {
        $httpProvider.defaults.useXDomain = true;
        //.config(['$http', function($http) {
       //$httpProvider.defaults.headers.common['Authorization'] = 'Basic admin@admin.com:123456';
       $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        // $httpProvider.defaults.headers.common['X-Requested-With'];
    }
])//run(['$http', function($http) {
   //$http.defaults.headers.common['Authorization'] = 'Basic admin@admin.com : 123456';
//}])

.controller('Login', function($scope,$http, $ionicSideMenuDelegate, Settings) {
  $ionicSideMenuDelegate.canDragContent(false);
//$http.defaults.headers.common['Authorization'] = 'Basic admin@admin.com : 123456';


  $scope.doLogin = function(){

    var user = {
      username : $scope.username,
      password : $scope.password
    }

    url = Settings.url + '/dataAll/type/vendors/format/json';
    //$http.defaults.headers.common = {"Access-Control-Request-Headers": "accept, origin, authorization"}; 
    $http.defaults.headers.common['Authorization'] = 'Basic ' + 'admin@admin.com' + ':' + '123456';
        /*$http.get('https://localhost/customer-relationship-management/apps/dataAll/type/vendors/format/json',{
    headers: {'Authorization': 'Basic' + user.username+ ':'+user.password},"X-Requested-With": "XMLHttpRequest"})*/
$http.get(url)
        .success(function(data) {
          //$scope.vendors = data.vendors;

          console.log(data);
        })
        .error(function(status){
          console.log(status);
        })
      
     

    //alert($scope.username);
  }
  
})
/*
.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})*/

// vendor
.controller('Vendor', 
    function($scope, $http, Settings) {
    url = Settings.url + '/dataAll/type/vendors/format/json';
        $http.get(url).
        success(function(data) {
          $scope.vendors = data.vendors;
          console.log('Success', data.vendors);
    // For JSON responses, resp.data contains the result
      $scope.doRefresh = function() {
        $http.get(url)
         .success(function(data) {
           $scope.vendors = data.vendors;
         })
         .finally(function() {
           // Stop the ion-refresher from spinning
           $scope.$broadcast('scroll.refreshComplete');
         });
      };
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})
//end of vendor

// lead
.controller('Lead', 
    function($scope, $http, Settings) {
    url = Settings.url + '/dataAll/type/leads/format/json';
        $http.get(url).
        success(function(data) {
          $scope.leads = data.leads;
          console.log('Success', data.leads);
    // For JSON responses, resp.data contains the result
      $scope.doRefresh = function() {
        $http.get(url)
         .success(function(data) {
           $scope.leads = data.leads;
         })
         .finally(function() {
           // Stop the ion-refresher from spinning
           $scope.$broadcast('scroll.refreshComplete');
         });
      };
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})
//end of lead

// customer
.controller('Customer', 
  function($scope, $http, Settings) {
    url = Settings.url + '/dataAll/type/customers/format/json';
    $http.get(url).
    success(function(data) {
      $scope.customers = data.customers;
      console.log('Success', data);
      // For JSON responses, resp.data contains the result
      $scope.doRefresh = function() {
        $http.get(url)
         .success(function(data) {
           $scope.customers = data.customers;
         })
         .finally(function() {
           // Stop the ion-refresher from spinning
           $scope.$broadcast('scroll.refreshComplete');
         });
      };
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})
//end of customer

// product
.controller('Product', 
    function($scope, $http, Settings) {
    url = Settings.url + '/dataAll/type/products/format/json';
        $http.get(url).
        success(function(data) {
          $scope.products = data.products;
          console.log('Success', data.products);
    // For JSON responses, resp.data contains the result
      $scope.doRefresh = function() {
        $http.get(url)
         .success(function(data) {
           $scope.products = data.products;
         })
         .finally(function() {
           // Stop the ion-refresher from spinning
           $scope.$broadcast('scroll.refreshComplete');
         });
      };
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})
//end of product

// quote
.controller('Quote', 
    function($scope, $http, Settings) {
    url = Settings.url + '/dataAll/type/quotes/format/json';
        $http.get(url).
        success(function(data) {
          $scope.quotes = data.quotes;
          console.log('Success', data.quotes);
    // For JSON responses, resp.data contains the result
      $scope.doRefresh = function() {
        $http.get(url)
         .success(function(data) {
           $scope.quotes = data.quotes;
         })
         .finally(function() {
           // Stop the ion-refresher from spinning
           $scope.$broadcast('scroll.refreshComplete');
         });
      };
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})
//end of quote

// website
.controller('Website', 
    function($scope, $http, Settings) {
    url = Settings.url + '/dataAll/type/websites/format/json';
        $http.get(url).
        success(function(data) {
          $scope.websites = data.websites;
          console.log('Success', data.websites);
    // For JSON responses, resp.data contains the result
      $scope.doRefresh = function() {
        $http.get(url)
         .success(function(data) {
           $scope.websites = data.websites;
         })
         .finally(function() {
           // Stop the ion-refresher from spinning
           $scope.$broadcast('scroll.refreshComplete');
         });
      };
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})
//end of website

// job
.controller('Job', 
    function($scope, $http, Settings) {
    url = Settings.url + '/dataAll/type/jobs/format/json';
        $http.get(url).
        success(function(data) {
          $scope.jobs = data.jobs;
          console.log('Success', data.jobs);
    // For JSON responses, resp.data contains the result
      $scope.doRefresh = function() {
        $http.get(url)
         .success(function(data) {
           $scope.jobs = data.jobs;
         })
         .finally(function() {
           // Stop the ion-refresher from spinning
           $scope.$broadcast('scroll.refreshComplete');
         });
      };
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})
//end of website

//invoice
.controller('Invoice', 
    function($scope, $http, Settings) {
    url = Settings.url + '/dataAll/type/invoices/format/json';
        $http.get(url).
        success(function(data) {
          $scope.invoices = data.invoices;
          console.log('Success', data.invoices);
    // For JSON responses, resp.data contains the result
      $scope.doRefresh = function() {
        $http.get(url)
         .success(function(data) {
           $scope.invoices = data.invoices;
         })
         .finally(function() {
           // Stop the ion-refresher from spinning
           $scope.$broadcast('scroll.refreshComplete');
         });
      };
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})
//end of website

//file
.controller('File', 
    function($scope, $http, Settings) {
    url = Settings.url + '/dataAll/type/files/format/json';
        $http.get(url).
        success(function(data) {
          $scope.upload = Settings.upload;
          $scope.files = data.files;
          console.log('Success', data.files);
    // For JSON responses, resp.data contains the result
      $scope.doRefresh = function() {
        $http.get(url)
         .success(function(data) {
           $scope.files = data.files;
         })
         .finally(function() {
           // Stop the ion-refresher from spinning
           $scope.$broadcast('scroll.refreshComplete');
         });
      };
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
});

// .controller('PlaylistCtrl', function($scope, $stateParams) {
// });
