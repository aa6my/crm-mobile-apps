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
angular.module('starter.controllers', ['ngResource','base64'])

.factory('Settings', function() {
  return {
      upload : 'https://localhost/customer-relationship-management/assets/uploads/files/',
      url : 'https://localhost/customer-relationship-management/apps'
  };
})
.factory('Auth', function(Base64){

  return {
    
    config : {headers: {
            'Authorization': 'Basic '+Base64.encode('admin@admin.com:123456'),
            'Accept': 'application/json;odata=verbose',
            "X-Testing" : "testing"
        }
    }
  };
})
.factory('Base64', function () {
    /* jshint ignore:start */
 
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
 
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };
 
    /* jshint ignore:end */
})

.config(['$httpProvider', function($httpProvider, $http) {
        $httpProvider.defaults.useXDomain = true;

$httpProvider.defaults.withCredentials = true;
/*delete $httpProvider.defaults.headers.common["X-Requested-With"];*/
$httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
$httpProvider.defaults.headers.common["Accept"] = "application/json";
$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
   
         
    }
])
.controller('Login', function($scope,$http, $ionicSideMenuDelegate, Settings, Base64, $state) {
  $ionicSideMenuDelegate.canDragContent(false);


    url = Settings.url + '/dataAll/type/vendors/format/json';
  
    
   
$scope.doLogin = function(){

    var user = {
      username : $scope.username,
      password : $scope.password
    } 

    var auth = Base64.encode(user.username + ':' + user.password);
    //alert(auth);
var config = {headers: {
            'Authorization': 'Basic '+auth,
            'Accept': 'application/json;odata=verbose',
            "X-Testing" : "testing"
        }
    };
    

$http.get(url, config)
        .success(function(data) {
         
          $scope.success = "berjaya";
          $state.go('app.main');
        })
        .error(function(data, status, headers, config){
          $scope.success = "xberjaya";
          console.log(config);
        })             
  }
  
})


// vendor
.controller('Vendor', 
    function($scope, $http, Settings, Auth) {
    url = Settings.url + '/dataAll/type/vendors/format/json';
        $http.get(url, Auth.config).
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
    function($scope, $http, Settings, Base64) {
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
