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
 * @package    vendor.js
 * @author     Nizam <nizam@segimidae.net>
 * @author     Norlihazmey <norlihazmey@segimidae.net>
 * @author     Azim <azim@segimidae.net>
 * @license    SeGi MiDae
 * @copyright  2015 SEGI MiDae
 * @version    0.5.1
*/

var apps_vendor = angular.module('vendorModule', ['ionic','cgBusy']);
    apps_vendor.controller('Vendor',['$scope','$http', '$state','$ionicPopup', 'Settings', 'init', 'Auth', 'UniversalFunction', 'CrudOperation',function($scope,$http, $state,$ionicPopup, Settings, init, Auth, UniversalFunction, CrudOperation) {
       
          /*=============== Vendor(initial start of page will call this part) ============================= */
        if(typeof analytics !== "undefined") { analytics.trackView("Vendors"); }
        /*-------------- initial value for page to show or hide button in vendor form add/edit-------------*/
        var m = UniversalFunction.returnButtonOnly();
        $scope.btnAdd = m.add;
        $scope.btnEdit = m.edit;
        /*---------------------------*/

        /*------------initial value for form data of update function ----*/
        $scope.formData = UniversalFunction.returnDisplayFormData();
        /*---------------------------------------------------------------*/

            var url = Settings.url + '/dataAll/type/vendors/format/json';
            
            $scope.myPromise =  $http
                .get(url, Auth.doAuth(init.username, init.password))
                .success(function(data){
                 
                    $scope.vendors = UniversalFunction.redraw(data.vendors);
                    
              }, function(err) {
                  console.error('ERR', err);
              
              })
                    
            $scope.doRefresh = function(){
            $scope.myPromise =  $http
                .get(url, Auth.doAuth(init.username, init.password))
                .success(function(data){
                  
                    $scope.vendors = UniversalFunction.redraw(data.vendors);

              })
              .finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
              });
            };                    
          

              /*-------------------- select country name and display into select option in add form ----------------- */
              var params = '/dataAll/type/country/format/json';
                  CrudOperation.get(params).success(function(data){  $scope.country_list = data.country;  });
              /*------------ end selection ---------------------------------------------------------------------------*/

               
              $scope.goToAddDataPage = function(){

                 //var public double m = {};
                   $state.go('app.vendorAdd_Edit',{},{reload:false});
                   /*------------- If click add new button show only submit button with save function--------------*/
                   var m = UniversalFunction.buttonOnly(true,false);
                   $scope.btnAdd = m.add;
                   $scope.btnEdit = m.edit;
                   /*---------------------------*/
                   /*---- set form value to blank */
                   UniversalFunction.displayFormData('');

              }

               $scope.goToEditDataPage = function(vendors){

                    $state.go('app.vendorAdd_Edit',{},{reload:false});
                    /*-------------If click edit button show only save button with edit function--------------*/
                    var n           = UniversalFunction.buttonOnly(false,true);
                    $scope.btnAdd   = n.add;
                    $scope.btnEdit  = n.edit;
                    /*---------------------------*/
                    /*-- display value form list into update form */
                    var b           = UniversalFunction.displayFormData(vendors);
                    $scope.formData = b;
                    
              }

          
 
          /*================================ Add function ================================*/
                $scope.addData  = function(){

                    $scope.formData = {};                           // store data from form into formData onject
                    var params      = '/dataAll';                   // request Api link
                    var data        = {                             // data sent to Api
                                        type : "vendors", 
                                        formData : this.formData
                        };
                    var stateToRedirect = 'app.vendors';
                    CrudOperation.add(params, data, stateToRedirect);  

                } 
        /*================================ End Add function ================================*/


        /*================================ Edit function ================================*/
                $scope.editData = function(){

                    var params     = '/dataAll';                  // request Api link
                    var dataUpdate = {                             // field column need to update
                                        vendor_name : $scope.formData.vendor_name,
                                        vendor_firstname : $scope.formData.vendor_firstname,
                                        vendor_lastname : $scope.formData.vendor_lastname,
                                        vendor_email : $scope.formData.vendor_email,
                                        vendor_phone : $scope.formData.vendor_phone,
                                        vendor_mobile : $scope.formData.vendor_mobile,
                                        vendor_fax : $scope.formData.vendor_fax,
                                        vendor_address : $scope.formData.vendor_address,
                                        vendor_postcode : $scope.formData.vendor_postcode,
                                        vendor_state : $scope.formData.vendor_state,
                                        country_id   : $scope.formData.country_id
                        };
                    var data       = {                             // data sent to Api
                                      type : "vendors",
                                      primaryKey : 'vendor_id', 
                                      primaryKeyVal : $scope.formData.vendor_id,
                                      formData : dataUpdate
                        };
                    var stateToRedirect = 'app.vendors';           // State that will redirect after update process success
                    CrudOperation.update(params, data, stateToRedirect);  
                } 
        /*================================ End Edit function ================================*/


        /*================================ Delete function ================================*/
                $scope.deleteData = function(vendor) {
                    var params = '/dataAll/type/vendors/key/vendor_id/val/'+vendor.vendor_id;
                    CrudOperation.delete(params);
                }
          /*================================ End Delete function ================================*/

          /*================================ Back function ================================*/
                 $scope.backVendor = function() {
                    $state.go('app.vendors');

                  }
          /*================================ End back function ================================*/

          $scope.backHome = function(){
            UniversalFunction.home_button();
          }

      }]);

