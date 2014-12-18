var apps = angular.module('customerModule', []);
	
	apps.controller('Customer',function($scope, $http, Settings, init, Auth) {
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