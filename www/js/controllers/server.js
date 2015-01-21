var apps = angular.module('serverModule', []);
	
	apps.controller('Server', function($scope,$http, $ionicSideMenuDelegate, Settings, $state, init, Auth) {
  $ionicSideMenuDelegate.canDragContent(false);


    var murl = 'http://apps.segimidae.net/x/dataAll/type/company/key/crm-product_id/val/1-1/joinid/company_id/jointo/applications';
    $http.get(murl)
        .success(function(data) {
          $scope.server = data.company;
          /*$state.go('app.login');*/
    })
    .error(function(data, status, headers, config){
          $scope.success = "xberjaya";
          //console.log(config);
    })    


    $scope.goToLogin = function(){
      //console.log($scope.server_name);
        //if($scope.server_name=="192.168.0.200"){}
        $state.go('app.login',{server_name : $scope.server_name}, {reload:false});
    }         
  
  
})