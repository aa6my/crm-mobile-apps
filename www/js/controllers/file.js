var apps = angular.module('fileModule', []);
	
	apps.controller('File',function($scope, $http, Settings, init, Auth) {
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