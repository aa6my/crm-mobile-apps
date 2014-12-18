var apps = angular.module('vendorModule', []);
	
	apps.controller('Vendor', function($scope, $http, Settings, init, Auth) {
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