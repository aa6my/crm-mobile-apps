/**

  +-+-+-+-+ +-+-+-+-+-+
  |S|E|G|I| |M|i|D|a|e|
  +-+-+-+-+ +-+-+-+-+-+

 * CRM MOBILE APPLICATION
 *
 * http://www.segimidae.net
 *
 * Ionic Framework
 * 
 * @category   controllers
 * @package    server.js
 * @author     Nizam <nizam@segimidae.net>
 * @author     Norlihazmey <norlihazmey@segimidae.net>
 * @author     Azim <azim@segimidae.net>
 * @license    SeGi MiDae
 * @copyright  2015 SEGI MiDae
 * @version    0.5.1
*/

var apps_server = angular.module('serverModule', []);
	
	apps_server.controller('Server',['$scope','$http', '$ionicSideMenuDelegate', 'Settings', '$state', 'init', 'Auth',function($scope,$http, $ionicSideMenuDelegate, Settings, $state, init, Auth) {
  $ionicSideMenuDelegate.canDragContent(false);


    var murl = 'https://segiapps.com/x/dataAll/type/company/key/crm-product_id/val/1-1/joinid/company_id/jointo/applications';


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
      if ($scope.company_id == null) {
          $scope.alerts = [
              { type: 'danger', msg: 'Please choose company before proceed.' },
            ]

            $scope.closeAlert = function(index) {
              $scope.alerts.splice(index, 1);
            }
      }
      else {

        url = 'https://segiapps.com/x/dataAll/type/company/key/crm-product_id-company.company_id/val/1-1-'+$scope.company_id+'/joinid/company_id/jointo/applications';
 
        $http.get(url)
              .success(function(data) {
                Settings.domain_name = data.company[0].domain_name;
                Settings.company_name = data.company[0].company_name;
                $state.go('app.login', {reload:false});
                
              })
                
      }

   //console.log(s);
       
        
    }         
  
  
}]);
