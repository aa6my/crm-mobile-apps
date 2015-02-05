var apps_login = angular.module('loginModule', []);
	
	apps_login.controller('Login',['$scope','$http', '$ionicSideMenuDelegate','$stateParams', 'Settings', '$state', 'init', 'Auth','$ionicPopup',function($scope,$http, $ionicSideMenuDelegate,$stateParams, Settings, $state, init, Auth,$ionicPopup) {
  $ionicSideMenuDelegate.canDragContent(false);
  
  
    url = 'https://' +Settings.domain_name+ '/apps/dataAll/type/vendors/format/json';
    //url = 'https://192.168.0.201/apps/dataAll/type/vendors/format/json';
    $scope.company_name = Settings.company_name;
    console.log(Settings.company_name);


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
        
        $ionicSideMenuDelegate.canDragContent(true);

          var alertPopup = $ionicPopup.alert({
              title: 'Login Successful',
              template: 'Going to dashboard!'
          })  
             
          init.username   = user.username;
          init.password   = user.password;
          Settings.upload  = 'https://'+Settings.domain_name+'/assets/uploads/files/';
          Settings.url    = 'https://'+Settings.domain_name+'/apps';
          $state.go('app.main');
          console.log(Settings.upload);
        })
        .error(function(data, status, headers, config){
       
            $scope.alerts = [
              { type: 'danger', msg: 'Oh snap! Wrong Username/Password.' },
            ]

            $scope.closeAlert = function(index) {
              $scope.alerts.splice(index, 1);
            }

        })             
  }
  
}]);
