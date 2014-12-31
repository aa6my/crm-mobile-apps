var apps = angular.module('customerModule', ['ionic']);
    apps.controller('Customer',function($scope,$http, $state,$ionicPopup, Settings, init, Auth, UniversalFunction, CrudOperation) {
       
          /*=============== Customer(initial start of page will call this part) ============================= */
        
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
                                        customer_state : $scope.formData.customer_state
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




      })

