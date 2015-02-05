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
 * @package    website.js
 * @author     Nizam <nizam@segimidae.net>
 * @author     Norlihazmey <norlihazmey@segimidae.net>
 * @author     Azim <azim@segimidae.net>
 * @license    SeGi MiDae
 * @copyright  2015 SEGI MiDae
 * @version    0.5.1
*/

var apps_website = angular.module('websiteModule', ['ionic','cgBusy']);
    apps_website.controller('Website',['$scope','$http', '$state','$ionicPopup', 'Settings', 'init', 'Auth', 'UniversalFunction', 'CrudOperation',function($scope,$http, $state,$ionicPopup, Settings, init, Auth, UniversalFunction, CrudOperation) {
       
          /*=============== website(initial start of page will call this part) ============================= */
        if(typeof analytics !== "undefined") { analytics.trackView("Websites"); }
        /*-------------- initial value for page to show or hide button in website form add/edit-------------*/
        var m = UniversalFunction.returnButtonOnly();
        $scope.btnAdd = m.add;
        $scope.btnEdit = m.edit;
        /*---------------------------*/

        /*------------initial value for form data of update function ----*/
        $scope.formData = UniversalFunction.returnDisplayFormData();
        /*---------------------------------------------------------------*/

            var url = Settings.url + '/dataAll/type/websites/format/json';

            
            $scope.myPromise =  $http
                .get(url, Auth.doAuth(init.username, init.password))
                .success(function(data){
                 
                    $scope.websites = UniversalFunction.redraw(data.websites);
                    //console.log(data);
                    
              }, function(err) {
                  console.error('ERR', err);
              
              })
                    
            $scope.doRefresh = function(){
            $scope.myPromise =  $http
                .get(url, Auth.doAuth(init.username, init.password))
                .success(function(data){
                  
                    $scope.websites = UniversalFunction.redraw(data.websites);

              })
              .finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
              });
            };                    
          
               
              $scope.goToAddDataPage = function(){

                 //var public double m = {};
                   $state.go('app.websiteAdd_Edit',{},{reload:false});
                   /*------------- If click add new button show only submit button with save function--------------*/
                   var m = UniversalFunction.buttonOnly(true,false);
                   $scope.btnAdd = m.add;
                   $scope.btnEdit = m.edit;
                   /*---------------------------*/
                   /*---- set form value to blank */
                   UniversalFunction.displayFormData('');

              }

               $scope.goToEditDataPage = function(websites){

                    $state.go('app.websiteAdd_Edit',{},{reload:false});
                    /*-------------If click edit button show only save button with edit function--------------*/
                    var n           = UniversalFunction.buttonOnly(false,true);
                    $scope.btnAdd   = n.add;
                    $scope.btnEdit  = n.edit;
                    /*---------------------------*/
                    /*-- display value form list into update form */
                    var b           = UniversalFunction.displayFormData(websites);
                    $scope.formData = b;
                    
              }

          
 
          /*================================ Add function ================================*/
                $scope.addData  = function(){

                    $scope.formData = {};                           // store data from form into formData onject
                    var params      = '/dataAll';                   // request Api link
                    var data        = {                             // data sent to Api
                                        type : "websites", 
                                        formData : this.formData
                        };
                    var stateToRedirect = 'app.websites';
                    CrudOperation.add(params, data, stateToRedirect);  

                } 
        /*================================ End Add function ================================*/


        /*================================ Edit function ================================*/
                $scope.editData = function(){

                    var params     = '/dataAll';                  // request Api link
                    var dataUpdate = {                             // field column need to update
                                        website_url : $scope.formData.website_url,
                                        website_name : $scope.formData.website_name
                        };
                    var data       = {                             // data sent to Api
                                      type : "websites",
                                      primaryKey : 'website_id', 
                                      primaryKeyVal : $scope.formData.website_id,
                                      formData : dataUpdate
                        };
                    var stateToRedirect = 'app.websites';           // State that will redirect after update process success
                    CrudOperation.update(params, data, stateToRedirect);  
                } 
        /*================================ End Edit function ================================*/


        /*================================ Delete function ================================*/
                $scope.deleteData = function(website) {
                    var params = '/dataAll/type/websites/key/website_id/val/'+website.website_id;
                    CrudOperation.delete(params);
                }
          /*================================ End Delete function ================================*/

          /*================================ Back function ================================*/
                 $scope.backWebsite = function() {
                    $state.go('app.websites');

                  }
          /*================================ End back function ================================*/


      }]);

