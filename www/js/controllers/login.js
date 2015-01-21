var apps = angular.module('loginModule', []);
	
	apps.controller('Login', function($scope,$http, $ionicSideMenuDelegate,$stateParams, Settings, $state, init, Auth) {
  $ionicSideMenuDelegate.canDragContent(false);
  
    url = 'http://' +$stateParams.server_name+ '/apps/dataAll/type/vendors/format/json';
    
    /** Using dummy data for development testing only */
   /* $scope.username = 'admin@admin.com';
    $scope.password = 123456;*/
    /* remove this in production environment */
   
  $scope.doLogin = function(){

      var user = {
        username : $scope.username,
        password : $scope.password
      } 

   
  $http.get(url, Auth.doAuth(user.username, user.password))
        .success(function(data) {
         
          alert("Authentication Successful");
          init.username   = user.username;
          init.password   = user.password;
          Settings.upload  = 'http://'+$stateParams.server_name+'/assets/uploads/files/';
          Settings.url    = 'http://'+ $stateParams.server_name+'/apps';
          
          $state.go('app.main');
        })
        .error(function(data, status, headers, config){
          alert("Wrong Username/Password");
          
        })             
  }
  
})