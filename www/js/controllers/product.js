var apps = angular.module('productModule', ['ionic']);
    apps.controller('Product',function($scope,$http, $state,$ionicPopup, Settings, init, Auth, UniversalFunction, CrudOperation, appServices) {
       
          /*=============== Product(initial start of page will call this part) ============================= */
        
        /*-------------- initial value for page to show or hide button in product form add/edit-------------*/
        var m = UniversalFunction.returnButtonOnly();
        $scope.btnAdd = m.add;
        $scope.btnEdit = m.edit;
        /*---------------------------*/

        /*------------initial value for form data of update function ----*/
        $scope.formData = UniversalFunction.returnDisplayFormData();
        /*---------------------------------------------------------------*/
        
         var url = Settings.url + '/dataAll/type/products/format/json';
              $http
                .get(url, Auth.doAuth(init.username, init.password))
                .success(function(data){
                 
                    $scope.products = UniversalFunction.redraw(data.products);
                    
              }, function(err) {
                  console.error('ERR', err);
              
              })
                    
            $scope.doRefresh = function(){
              $http
                .get(url, Auth.doAuth(init.username, init.password))
                .success(function(data){
                  
                    $scope.products = UniversalFunction.redraw(data.products);

              })
              .finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
              });
            }; 

               
              $scope.goToAddDataPage = function(){

                   $state.go('app.productAdd_Edit',{},{reload:false});
                   /*------------- If click add new button show only submit button with save function--------------*/
                   var m = UniversalFunction.buttonOnly(true,false);
                   $scope.btnAdd = m.add;
                   $scope.btnEdit = m.edit;
                   /*---------------------------*/
                   /*---- set form value to blank */
                   UniversalFunction.displayFormData('');
                   
                  
              }

               $scope.goToEditDataPage = function(products){

                    $state.go('app.productAdd_Edit',{},{reload:false});
                    /*-------------If click edit button show only save button with edit function--------------*/
                    var n           = UniversalFunction.buttonOnly(false,true);
                    $scope.btnAdd   = n.add;
                    $scope.btnEdit  = n.edit;
                    /*---------------------------*/
                    /*-- display value form list into update form */
                    var b           = UniversalFunction.displayFormData(products);
                    $scope.formData = b;
                    
              }

          
 
          /*================================ Add function ================================*/
                $scope.addData  = function(){

                    $scope.formData = {};                           // store data from form into formData onject
                    var params      = '/dataAll';                   // request Api link
                    var data        = {                             // data sent to Api
                                        type : "products", 
                                        formData : this.formData
                        };
                    var stateToRedirect = 'app.products';
                    CrudOperation.add(params, data, stateToRedirect);  

                } 
        /*================================ End Add function ================================*/




        /*================================ Edit function ================================*/
                $scope.editData = function(){

                    var params     = '/dataAll';                  // request Api link
                    var dataUpdate = {                             // field column need to update
                                        product_sku : $scope.formData.product_sku,
                                        product_name : $scope.formData.product_name,
                                        product_desc : $scope.formData.product_desc,
                                        product_quantity : $scope.formData.product_quantity,
                                        product_amount : $scope.formData.product_amount
                        };
                    var data       = {                             // data sent to Api
                                      type : "products",
                                      primaryKey : 'product_id', 
                                      primaryKeyVal : $scope.formData.product_id,
                                      formData : dataUpdate
                        };
                    var stateToRedirect = 'app.products';           // State that will redirect after update process success
                    CrudOperation.update(params, data, stateToRedirect);  
                } 
        /*================================ End Edit function ================================*/




        /*================================ Delete function ================================*/
                $scope.deleteData = function(product) {
                    var params = '/dataAll/type/products/key/product_id/val/'+product.product_id;
                    CrudOperation.delete(params);
                }
          /*================================ End Delete function ================================*/


           /*================================ Back function ================================*/
                $scope.backProduct = function() {
                    $state.go('app.products');

                  }
          /*================================ End back function ================================*/

                $scope.click = function() {
                    var promise = appServices.scanBarcode();
                    promise.then(
                        function(result) {
                            if (result.error == false) {
                                /*var d = new Date();
                                $scope.message = '<table>' +
                                    '<tbody>' +
                                    '<tr><td>Timestamp:</td><td>&nbsp;</td><td>' + d.toUTCString() + '</td></tr>' +
                                    '<tr><td>Text:</td><td>&nbsp;</td><td>' + result.result.text + '</td></tr>' +
                                    '<tr><td>Format:</td><td>&nbsp;</td><td>' + result.result.format + '</td></tr>' +
                                    '<tr><td>Text:</td><td>&nbsp;</td><td>' + result.result.cancelled + '</td></tr>' +
                                    '</tbody>' +
                                    '</table>';*/
                                    $scope.formData.product_sku = result.result.text;
                            }
                            else {
                                $state.go('app.productAdd_Edit',{},{reload:false});
                    
                            }
                        });
                }

      })

