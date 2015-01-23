var apps = angular.module('loginModule', []);
	
	apps.controller('Login', function($scope,$http, $ionicSideMenuDelegate,$stateParams, Settings, $state, init, Auth,$ionicPopup) {
  $ionicSideMenuDelegate.canDragContent(false);
  
    url = 'http://' +$stateParams.server_name+ '/apps/dataAll/type/vendors/format/json';
    //url = 'http://192.168.0.201/apps/dataAll/type/vendors/format/json';

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
         
          var alertPopup = $ionicPopup.alert({
              title: 'Login Successful',
              template: 'Going to dashboard!'
          })  
             
          init.username   = user.username;
          init.password   = user.password;
          Settings.upload  = 'http://'+$stateParams.server_name+'/assets/uploads/files/';
          Settings.url    = 'http://'+ $stateParams.server_name+'/apps';
          
          $state.go('app.main');
        })
        .error(function(data, status, headers, config){
       
              $scope.wrong =  true;

        })             
  }
  
})