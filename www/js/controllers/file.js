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
 * @package    file.js
 * @author     Nizam <nizam@segimidae.net>
 * @author     Norlihazmey <norlihazmey@segimidae.net>
 * @author     Azim <azim@segimidae.net>
 * @license    SeGi MiDae
 * @copyright  2015 SEGI MiDae
 * @version    0.5.1
*/

var apps_file = angular.module('fileModule', ['ionic','cgBusy']);
    apps_file.controller('File',['$scope','$http', '$state','$ionicPopup', 'Settings', 'init', 'Auth', 'UniversalFunction', 'CrudOperation',function($scope,$http, $state,$ionicPopup, Settings, init, Auth, UniversalFunction, CrudOperation) {
       
          /*=============== Website(initial start of page will call this part) ============================= */

        // Start of Google Analytic Function  
        if(typeof analytics !== "undefined") { analytics.trackView("Files"); }
        // End

        /*-------------- initial value for page to show or hide button in website form add/edit-------------*/
        var m = UniversalFunction.returnButtonOnly();
        $scope.btnAdd = m.add;
        $scope.btnEdit = m.edit;
        /*---------------------------*/

        /*------------initial value for form data of update function ----*/
        $scope.formData = UniversalFunction.returnDisplayFormData();
        /*---------------------------------------------------------------*/
        
         var url = Settings.url + '/dataAll/type/files/format/json';
              
            $scope.myPromise =  $http
                .get(url, Auth.doAuth(init.username, init.password))
                .success(function(data){
                 
                    $scope.files = UniversalFunction.redraw(data.files);
                    
              }, function(err) {
                  console.error('ERR', err);
              })
            
            //Refresh function when drag down content        
            $scope.doRefresh = function(){
            $scope.myPromise =  $http
                .get(url, Auth.doAuth(init.username, init.password))
                .success(function(data){
                  
                    $scope.files = UniversalFunction.redraw(data.files);

              })
              .finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
              });
            };
            // End refresh function
              
               // Go to ADD/EDIT Page function  
              $scope.goToAddDataPage = function(){

                   /*$state.go('app.fileAdd_Edit',{},{reload:false});
               
                   var m = UniversalFunction.buttonOnly(true,false);
                   $scope.btnAdd = m.add;
                   $scope.btnEdit = m.edit;
              
                   UniversalFunction.displayFormData(''); */
                   alert("Page under construction.");
              }

               $scope.goToEditDataPage = function(files){

                    $state.go('app.fileAdd_Edit',{},{reload:false});
                    /*-------------If click edit button show only save button with edit function--------------*/
                    var n           = UniversalFunction.buttonOnly(false,true);
                    $scope.btnAdd   = n.add;
                    $scope.btnEdit  = n.edit;
                    /*---------------------------*/
                    /*-- display value form list into update form */
                    var b           = UniversalFunction.displayFormData(files);
                    $scope.formData = b;   
              }
              //End
        
          /*================================ Add function ================================*/
                $scope.addData  = function(){

                    $scope.formData = {};                           // store data from form into formData onject
                    var params      = '/dataAll';                   // request Api link
                    var data        = {                             // data sent to Api
                                        type : "files", 
                                        formData : this.formData
                        };
                    var stateToRedirect = 'app.files';
                    CrudOperation.add(params, data, stateToRedirect);  
                } 
        /*================================ End Add function ================================*/

        /*================================ Edit function ================================*/
                $scope.editData = function(){

                    var params     = '/dataAll';                  // request Api link
                    var dataUpdate = {                             // field column need to update
                                        file_content : $scope.formData.file_content,
                                        file_name : $scope.formData.file_name
                        };
                    var data       = {                             // data sent to Api
                                      type : "files",
                                      primaryKey : 'file_id', 
                                      primaryKeyVal : $scope.formData.file_id,
                                      formData : dataUpdate
                        };
                    var stateToRedirect = 'app.files';           // State that will redirect after update process success
                    CrudOperation.update(params, data, stateToRedirect);  
                } 
        /*================================ End Edit function ================================*/

        /*================================ Delete function ================================*/
                $scope.deleteData = function(file) {
                    var params = '/dataAll/type/files/key/file_id/val/'+file.file_id;
                    CrudOperation.delete(params);
                }
          /*================================ End Delete function ================================*/

          /*================================ Back function ================================*/
                 $scope.backFile = function() {
                    $state.go('app.files');

                  }
          /*================================ End back function ================================*/

              $scope.backHome = function(){
                    UniversalFunction.home_button();
                  }

      }]);

