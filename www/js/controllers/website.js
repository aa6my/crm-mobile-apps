var apps = angular.module('websiteModule', ['ionic']);

    apps.controller('Website',function($scope,$http, $state,$ionicPopup, Settings, init, Auth, UniversalFunction, CrudOperation ) {
       
          /**************************** Website(initial start of page will call this part) ************************************/
         var url = Settings.url + '/dataAll/type/websites/format/json';
              $http
                .get(url, Auth.doAuth(init.username, init.password))
                .success(function(data){
                    $scope.websites = data.websites;
                
                    $scope.doRefresh = function(){
                      $http
                        .get(url, Auth.doAuth(init.username, init.password))
                        .success(function(data){
                            $scope.websites = data.websites;
                        })
                        .finally(function(){
                            $scope.$broadcast('scroll.refreshComplete');
                       });
                    };
              }, function(err) {
              console.error('ERR', err);
              
              })

              $scope.goToAddDataPage = function(){  //function redirect to add form page
                  $state.go('app.websiteAdd');
              }

               $scope.goToEditPage = function(){
                  $state.go('app.websiteEdit');
              }
          /**************************** End Website page ************************************/





          /**************************** Add function ************************************/
            $scope.addData = function(){

            $scope.formData = {};                           //store data from form into formData onject
            var params      = '/dataAll';                   //request Api link
            var data        = {                             //data sent to Api
                                type : "websites", 
                                formData : this.formData
                              };
            var stateToRedirect = 'app.websites';
            $scope.CRUD.add(params, data, stateToRedirect);
            
          
        }
         /**************************** End Add function ************************************/




        /**************************** Delete function ************************************/
          $scope.deleteData = function(website) {
            var params = '/dataAll/type/websites/key/website_id/val/'+website.website_id;
            CrudOperation.delete(params);

          }
          /**************************** End Delete function ************************************/

      })

