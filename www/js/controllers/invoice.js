var apps = angular.module('invoiceModule', ['ionic']);
    apps.controller('Invoice',function($scope,$http, $state,$ionicPopup, Settings, init, Auth, UniversalFunction, CrudOperation) {
       
          /*=============== invoice(initial start of page will call this part) ============================= */
        
        /*-------------- initial value for page to show or hide button in invoice form add/edit-------------*/
        var m = UniversalFunction.returnButtonOnly();
        $scope.btnAdd = m.add;
        $scope.btnEdit = m.edit;
        /*---------------------------*/

        /*------------initial value for form data of update function ----*/
        $scope.formData = UniversalFunction.returnDisplayFormData();
        /*---------------------------------------------------------------*/

            var url = Settings.url + '/dataAll/type/invoices/format/json';
            
              $http
                .get(url, Auth.doAuth(init.username, init.password))
                .success(function(data){
                 
                    $scope.invoices = UniversalFunction.redraw(data.invoices);
                    
              }, function(err) {
                  console.error('ERR', err);
              
              })
                    
            $scope.doRefresh = function(){
              $http
                .get(url, Auth.doAuth(init.username, init.password))
                .success(function(data){
                  
                    $scope.invoices = UniversalFunction.redraw(data.invoices);

              })
              .finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
              });
            };


            $scope.goToAddDataPage = function(){

                   $state.go('app.invoiceAdd_Edit',{},{reload:false});
                   /*------------- If click add new button show only submit button with save function--------------*/
                   var m = UniversalFunction.buttonOnly(true,false);
                   $scope.btnAdd = m.add;
                   $scope.btnEdit = m.edit;
                   /*---------------------------*/
                   /*---- set form value to blank */
                   UniversalFunction.displayFormData('');
                   
                  
              }

               $scope.goToEditDataPage = function(invoices){

                    $state.go('app.invoiceAdd_Edit',{},{reload:false});
                    /*-------------If click edit button show only save button with edit function--------------*/
                    var n           = UniversalFunction.buttonOnly(false,true);
                    $scope.btnAdd   = n.add;
                    $scope.btnEdit  = n.edit;
                    /*---------------------------*/
                    /*-- display value form list into update form */
                    var b           = UniversalFunction.displayFormData(invoices);
                    $scope.formData = b;
                    
              }

          
 
          /*================================ Add function ================================*/
                $scope.addData  = function(){

                    $scope.formData = {};                           // store data from form into formData onject
                    var params      = '/dataAll';                   // request Api link
                    var data        = {                             // data sent to Api
                                        type : "invoices", 
                                        formData : this.formData
                        };
                    var stateToRedirect = 'app.invoices';
                    CrudOperation.add(params, data, stateToRedirect);  

                } 
        /*================================ End Add function ================================*/




        /*================================ Edit function ================================*/
                $scope.editData = function(){

                    var params     = '/dataAll';                  // request Api link
                    var dataUpdate = {                             // field column need to update
                                        invoice_subject : $scope.formData.invoice_subject,
                                        invoice_date_created : $scope.formData.invoice_date_created,
                                        invoice_customer_notes : $scope.formData.invoice_customer_notes,
                                        invoice_valid_until : $scope.formData.invoice_valid_until,
                                        invoice_status : $scope.formData.invoice_status


                        };
                    var data       = {                             // data sent to Api
                                      type : "invoices",
                                      primaryKey : 'invoice_id', 
                                      primaryKeyVal : $scope.formData.invoice_id,
                                      formData : dataUpdate
                        };
                    var stateToRedirect = 'app.invoices';           // State that will redirect after update process success
                    CrudOperation.update(params, data, stateToRedirect);  
                } 
        /*================================ End Edit function ================================*/




        /*================================ Delete function ================================*/
                $scope.deleteData = function(invoice) {
                    var params = '/dataAll/type/invoices/key/invoice_id/val/'+invoice.invoice_id;
                    CrudOperation.delete(params);
                }
          /*================================ End Delete function ================================*/

          /*================================ Back function ================================*/
                 $scope.backInvoice = function() {
                    $state.go('app.invoices');

                  }
          /*================================ End back function ================================*/




  $scope.open1 = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened1 = true;
  };
  $scope.open2 = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened2 = true;
  };


/*
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
*/
      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy','yyyy-MM-dd', 'shortDate'];
      $scope.format  = $scope.formats[3];


      })
          