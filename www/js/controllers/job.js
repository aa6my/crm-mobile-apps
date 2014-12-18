var apps = angular.module('jobModule', []);
	
	apps.controller('Job', function($scope, $http, Settings, init, Auth) {
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