var apps = angular.module('leadModule', []);
	
	apps.controller('Lead', function($scope, $http, Settings, init, Auth) {
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