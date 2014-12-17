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
angular.module('starter.controllers', ['ngResource','base64', 'ServiceModule', 'ValConstantService', 'ConfigModule'])

.controller('Website',function($scope, $http, $state, Settings, init, Auth, CrudOperation, UniversalFunction) {
 /* angular.element(document).ready(function () {
        angular.element('table').footable();
    });*/
    url = Settings.url + '/dataAll/type/websites/format/json';
        $http.get(url, Auth.doAuth(init.username, init.password)).
        success(function(data) {
          $scope.websites = data.websites;
          
              $scope.doRefresh = function() {
                $http.get(url, Auth.doAuth(init.username, init.password))
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
        
        })

  $scope.deleteData = function(website){

        var params = '/dataAll/type/websites/key/website_id/val/'+website.website_id;
            CrudOperation.delete(params);
            UniversalFunction.refreshOnce(url).success(function(data) {
                   $scope.websites = data.websites;
                 })
                 .finally(function() {
                   
                   $scope.$broadcast('scroll.refreshComplete');
                 });

    }

  $scope.addData = function(){
    $state.go('app.websiteAdd');
  }
})
//end of website
.controller('Login', function($scope,$http, $ionicSideMenuDelegate, Settings, $state, init, Auth) {
  $ionicSideMenuDelegate.canDragContent(false);


    url = Settings.url + '/dataAll/type/vendors/format/json';

    /** Using dummy data for development testing only */
    $scope.username = 'admin@admin.com';
    $scope.password = 123456;
    /* remove this in production environment */
   
  $scope.doLogin = function(){

      var user = {
        username : $scope.username,
        password : $scope.password
      } 

   
  $http.get(url, Auth.doAuth(user.username, user.password))
        .success(function(data) {
         
          $scope.success = "berjaya";
          init.username = user.username;
          init.password = user.password;
          $state.go('app.main');
        })
        .error(function(data, status, headers, config){
          $scope.success = "xberjaya";
          //console.log(config);
        })             
  }
  
})

// vendor
.controller('Vendor', function($scope, $http, Settings, init, Auth) {
      console.log(init.username);
    url = Settings.url + '/dataAll/type/vendors/format/json';
        $http.get(url, Auth.doAuth(init.username, init.password)).
        success(function(data) {
          $scope.vendors = data.vendors;
          console.log('Success', data.vendors);
    // For JSON responses, resp.data contains the result
      $scope.doRefresh = function() {
        $http.get(url, Auth.doAuth(init.username, init.password))
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
.controller('Lead', function($scope, $http, Settings, init, Auth) {
    url = Settings.url + '/dataAll/type/leads/format/json';
        $http.get(url, Auth.doAuth(init.username, init.password)).
        success(function(data) {
          $scope.leads = data.leads;
          console.log('Success', data.leads);
    // For JSON responses, resp.data contains the result
      $scope.doRefresh = function() {
        $http.get(url, Auth.doAuth(init.username, init.password))
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
.controller('Customer',function($scope, $http, Settings, init, Auth) {
    url = Settings.url + '/dataAll/type/customers/format/json';
    $http.get(url, Auth.doAuth(init.username, init.password)).
    success(function(data) {
      $scope.customers = data.customers;
      console.log('Success', data);
      // For JSON responses, resp.data contains the result
      $scope.doRefresh = function() {
        $http.get(url, Auth.doAuth(init.username, init.password))
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
.controller('Product', function($scope, $http, Settings, init, Auth) {
    url = Settings.url + '/dataAll/type/products/format/json';
        $http.get(url, Auth.doAuth(init.username, init.password)).
        success(function(data) {
          $scope.products = data.products;
          console.log('Success', data.products);
    // For JSON responses, resp.data contains the result
      $scope.doRefresh = function() {
        $http.get(url, Auth.doAuth(init.username, init.password))
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
.controller('Quote', function($scope, $http, Settings, init, Auth) {
    url = Settings.url + '/dataAll/type/quotes/format/json';
        $http.get(url, Auth.doAuth(init.username, init.password)).
        success(function(data) {
          $scope.quotes = data.quotes;
          console.log('Success', data.quotes);
    // For JSON responses, resp.data contains the result
      $scope.doRefresh = function() {
        $http.get(url, Auth.doAuth(init.username, init.password))
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



// job
.controller('Job', function($scope, $http, Settings, init, Auth) {
    url = Settings.url + '/dataAll/type/jobs/format/json';
        $http.get(url, Auth.doAuth(init.username, init.password)).
        success(function(data) {
          $scope.jobs = data.jobs;
          console.log('Success', data.jobs);
    // For JSON responses, resp.data contains the result
      $scope.doRefresh = function() {
        $http.get(url, Auth.doAuth(init.username, init.password))
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
.controller('Invoice',function($scope, $http, Settings, init, Auth) {
    url = Settings.url + '/dataAll/type/invoices/format/json';
        $http.get(url, Auth.doAuth(init.username, init.password)).
        success(function(data) {
          $scope.invoices = data.invoices;
          console.log('Success', data.invoices);
    // For JSON responses, resp.data contains the result
      $scope.doRefresh = function() {
        $http.get(url, Auth.doAuth(init.username, init.password))
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
.controller('File',function($scope, $http, Settings, init, Auth) {
    url = Settings.url + '/dataAll/type/files/format/json';
        $http.get(url, Auth.doAuth(init.username, init.password)).
        success(function(data) {
          $scope.upload = Settings.upload;
          $scope.files = data.files;
          console.log('Success', data.files);
    // For JSON responses, resp.data contains the result
      $scope.doRefresh = function() {
        $http.get(url, Auth.doAuth(init.username, init.password))
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
