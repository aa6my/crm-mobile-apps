var apps = angular.module('invoiceModule', []);
	
	apps.controller('Invoice',function($scope, $http, Settings, init, Auth) {
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