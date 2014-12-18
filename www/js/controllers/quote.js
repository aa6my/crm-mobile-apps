var apps = angular.module('quoteModule', []);
	
	apps.controller('Quote', function($scope, $http, Settings, init, Auth) {
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