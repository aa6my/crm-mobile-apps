var apps_signout = angular.module('signoutModule', []);
	
apps_signout.controller('Signout',['$scope','$http','$stateParams', 'Settings', '$state', 'init', 'Auth','$ionicPopup',function($scope,$http,$stateParams, Settings, $state, init, Auth,$ionicPopup) {
  
    $scope.doSignout = function(){
        var confirmPopup = $ionicPopup.confirm({
            title: 'Sign Out',
            template: 'Are you sure you want to sign out?'
        })
        confirmPopup.then(function(res) {
            if(res) {
                init.username = "";
                init.password = "";
                $state.go('app.server');                
            } else {
                console.log('You are not sure');
            }
        })      
    }  
}]);