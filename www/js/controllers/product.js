var apps = angular.module('productModule', []);
	
	apps.controller('Product', function($scope, $http, Settings, init, Auth) {
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