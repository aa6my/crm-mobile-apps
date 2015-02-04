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
 * @package    customer.js
 * @author     Nizam <nizam@segimidae.net>
 * @author     Norlihazmey <norlihazmey@segimidae.net>
 * @author     Azim <azim@segimidae.net>
 * @license    SeGi MiDae
 * @copyright  2015 SEGI MiDae
 * @version    0.5.1
*/

var apps_customer = angular.module('customerModule', ['ionic']);
    apps_customer.controller('Customer',['$scope','$http', '$state','$ionicPopup', 'Settings', 'init', 'Auth', 'UniversalFunction', 'CrudOperation',function($scope,$http, $state,$ionicPopup, Settings, init, Auth, UniversalFunction, CrudOperation) {
       
          /*=============== Customer(initial start of page will call this part) ============================= */

        // Start of Google Analytic Function 
        if(typeof analytics !== "undefined") { analytics.trackView("Customers"); }
        // End of Google Analytic

        /*-------------- initial value for page to show or hide button in customer form add/edit-------------*/
        var m = UniversalFunction.returnButtonOnly();
        $scope.btnAdd = m.add;
        $scope.btnEdit = m.edit;
        /*---------------------------*/

        /*------------initial value for form data of update function ----*/
        $scope.formData = UniversalFunction.returnDisplayFormData();
        /*---------------------------------------------------------------*/
        
         var url = Settings.url + '/dataAll/type/customers/format/json';
              
              $http
                .get(url, Auth.doAuth(init.username, init.password))
                .success(function(data){
                 
                    $scope.customers = UniversalFunction.redraw(data.customers);
                    
              }, function(err) {
                  console.error('ERR', err);
              })
                
            //Refresh function when drag down content        
            $scope.doRefresh = function(){
              $http
                .get(url, Auth.doAuth(init.username, init.password))
                .success(function(data){
                  
                    $scope.customers = UniversalFunction.redraw(data.customers);

              })
              .finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
              });
            };
            // End refresh function

            /*-------------------- select country name and display into select option in add form ----------------- */
              var params = '/dataAll/type/country/format/json';
                  CrudOperation.get(params).success(function(data){  $scope.country_list = data.country;  });
              /*------------ end selection ---------------------------------------------------------------------------*/
              
              // Go to ADD/EDIT Page function 
              $scope.goToAddDataPage = function(){

                   $state.go('app.customerAdd_Edit',{},{reload:false});
                   /*------------- If click add new button show only submit button with save function--------------*/
                   var m = UniversalFunction.buttonOnly(true,false);
                   $scope.btnAdd = m.add;
                   $scope.btnEdit = m.edit;
                   /*---------------------------*/
                   /*---- set form value to blank */
                   UniversalFunction.displayFormData('');
                   
                  
              }

               $scope.goToEditDataPage = function(customers){

                    $state.go('app.customerAdd_Edit',{},{reload:false});
                    /*-------------If click edit button show only save button with edit function--------------*/
                    var n           = UniversalFunction.buttonOnly(false,true);
                    $scope.btnAdd   = n.add;
                    $scope.btnEdit  = n.edit;
                    /*---------------------------*/
                    /*-- display value form list into update form */
                    var b           = UniversalFunction.displayFormData(customers);
                    $scope.formData = b;
                    
              }

            //End
 
          /*================================ Add function ================================*/
                $scope.addData  = function(){

                    $scope.formData = {};                           // store data from form into formData onject
                    var params      = '/dataAll';                   // request Api link
                    var data        = {                             // data sent to Api
                                        type : "customers", 
                                        formData : this.formData
                        };
                    var stateToRedirect = 'app.customers';
                    CrudOperation.add(params, data, stateToRedirect);  
              } 
        /*================================ End Add function ================================*/




        /*================================ Edit function ================================*/
                $scope.editData = function(){

                    var params     = '/dataAll';                  // request Api link
                    var dataUpdate = {                             // field column need to update
                                        customer_name : $scope.formData.customer_name,
                                        customer_firstname : $scope.formData.customer_firstname,
                                        customer_lastname : $scope.formData.customer_lastname,
                                        customer_email : $scope.formData.customer_email,
                                        customer_phone : $scope.formData.customer_phone,
                                        customer_mobile : $scope.formData.customer_mobile,
                                        customer_fax : $scope.formData.customer_fax,
                                        customer_address : $scope.formData.customer_address,
                                        customer_postcode : $scope.formData.customer_postcode,
                                        customer_state : $scope.formData.customer_state,
                                        country_id : $scope.formData.country_id
                        };
                    var data       = {                             // data sent to Api
                                      type : "customers",
                                      primaryKey : 'customer_id', 
                                      primaryKeyVal : $scope.formData.customer_id,
                                      formData : dataUpdate
                        };
                    var stateToRedirect = 'app.customers';           // State that will redirect after update process success
                    CrudOperation.update(params, data, stateToRedirect);  
                } 
        /*================================ End Edit function ================================*/




        /*================================ Delete function ================================*/
                $scope.deleteData = function(customer) {
                    var params = '/dataAll/type/customers/key/customer_id/val/'+customer.customer_id;
                    CrudOperation.delete(params);
                }
          /*================================ End Delete function ================================*/

          /*================================ Back function ================================*/
                 $scope.backCustomer = function() {
                    $state.go('app.customers');

                  }
          /*================================ End back function ================================*/




      }])

