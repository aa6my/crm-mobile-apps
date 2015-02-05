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
 * @package    product.js
 * @author     Nizam <nizam@segimidae.net>
 * @author     Norlihazmey <norlihazmey@segimidae.net>
 * @author     Azim <azim@segimidae.net>
 * @license    SeGi MiDae
 * @copyright  2015 SEGI MiDae
 * @version    0.5.1
*/

var apps_product = angular.module('productModule', ['ionic']);
    apps_product.controller('Product',['$scope','$http', '$state','$ionicPopup', 'Settings', 'init', 'Auth', 'UniversalFunction', 'CrudOperation', 'appServices',function($scope,$http, $state,$ionicPopup, Settings, init, Auth, UniversalFunction, CrudOperation, appServices) {
       
          /*=============== Product(initial start of page will call this part) ============================= */
        if(typeof analytics !== "undefined") { analytics.trackView("Products"); }
        /*-------------- initial value for page to show or hide button in product form add/edit-------------*/
        var m = UniversalFunction.returnButtonOnly();
        $scope.btnAdd = m.add;
        $scope.product_add = m.add;
        $scope.product_edit = m.edit;
        $scope.btnEdit = m.edit;
        /*---------------------------*/

        /*------------initial value for form data of update function ----*/
        $scope.formData = UniversalFunction.returnDisplayFormData();
        //$scope.product_sku = "";
        /*---------------------------------------------------------------*/
        
         var url = Settings.url + '/dataAll/type/products/format/json';
            $scope.myPromise =  $http
                .get(url, Auth.doAuth(init.username, init.password))
                .success(function(data){
                 
                    $scope.products = UniversalFunction.redraw(data.products);
                    
              }, function(err) {
                  console.error('ERR', err);
              
              })
                    
            $scope.doRefresh = function(){
            $scope.myPromise =  $http
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
                    //init.sku = products.product_sku;

                    $state.go('app.productAdd_Edit',{},{reload:false});
                    /*-------------If click edit button show only save button with edit function--------------*/
                    
                    var n           = UniversalFunction.buttonOnly(false,true);
                    $scope.btnAdd   = n.add;
                    $scope.btnEdit  = n.edit;
                    /*---------------------------*/
                    /*-- display value form list into update form */
                    var b           = UniversalFunction.displayFormData(products);
                    //var h = {product_sku:''};
                       // h.product_sku = b.product_sku;
                    $scope.formData = b;
                    //$scope.product_sku = "sdsd";
                    //$scope.product_sku = "";
                    //$scope.product_sku = b.product_sku;
                    /*if ($scope.formData.product_sku !== null || $scope.formData.product_sku !== "" ) {
                      $scope.product_sku = $scope.formData.product_sku;
                    }else{
                      $scope.product_sku = b.product_sku;
                    };*/
                    //console.log(init.sku);
                    //$scope.product_sku = init.sku;
                   console.log($scope.formData.product_sku);
              }

          
 
          /*================================ Add function ================================*/
                $scope.addData  = function(sku){

                    $scope.formData = {};      
                    var dataForm = {
                      product_name : this.formData.product_name,
                      product_desc : this.formData.product_desc,
                      product_quantity : this.formData.product_quantity,
                      product_amount : this.formData.product_amount,
                      product_sku : sku
                    };
                                        // store data from form into formData onject
                    var params      = '/dataAll';                   // request Api link
                    var data        = {                             // data sent to Api
                                        type : "products", 
                                        formData : dataForm,

                        };
                    var stateToRedirect = 'app.products';
                    CrudOperation.add(params, data, stateToRedirect);  

                } 
        /*================================ End Add function ================================*/




        /*================================ Edit function ================================*/
                $scope.editData = function(){

                  if($scope.product_add==true){

                    var ssk = $scope.product_sku;
                  }
                  else{
                    var ssk = $scope.formData.product_sku;
                  }



                    var params     = '/dataAll';                  // request Api link
                    var dataUpdate = {                             // field column need to update
                                        product_sku  :  ssk,
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

                  $scope.product_add = true;
                  $scope.product_edit = false;
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
                                  $scope.product_sku = result.result.text;
                            }
                            else {
                                $state.go('app.productAdd_Edit',{},{reload:false});
                    
                            }
                        })
                }

      }]);