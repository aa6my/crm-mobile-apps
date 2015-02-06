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
 * @package    invoice.js
 * @author     Nizam <nizam@segimidae.net>
 * @author     Norlihazmey <norlihazmey@segimidae.net>
 * @author     Azim <azim@segimidae.net>
 * @license    SeGi MiDae
 * @copyright  2015 SEGI MiDae
 * @version    0.5.1
*/

var apps_invoice = angular.module('invoiceModule', ['ionic','ui.bootstrap','cgBusy']);
    apps_invoice.controller('Invoice',['$scope','$http', '$state','$ionicPopup','$ionicModal', '$stateParams', 'Settings', 'init', 'Auth', 'UniversalFunction', 'CrudOperation',function($scope,$http, $state,$ionicPopup,$ionicModal, $stateParams, Settings, init, Auth, UniversalFunction, CrudOperation) {
       
          /*=============== invoice(initial start of page will call this part) ============================= */
        if(typeof analytics !== "undefined") { analytics.trackView("Invoices"); }
        /*-------------- initial value for page to show or hide button in invoice form add/edit-------------*/
        var m = UniversalFunction.returnButtonOnly();
        $scope.btnAdd = m.add;
        $scope.btnEdit = m.edit;
        /*---------------------------*/

        /*------------initial value for form data of update function ----*/
        $scope.formData = UniversalFunction.returnDisplayFormData();
        /*---------------------------------------------------------------*/

            var url = Settings.url + '/dataAll/type/invoices/format/json';
            
            $scope.myPromise =  $http
                .get(url, Auth.doAuth(init.username, init.password))
                .success(function(data){
                 
                    $scope.invoices = UniversalFunction.redraw(data.invoices);
                    
              }, function(err) {
                  console.error('ERR', err);
              
              })
                    
            $scope.doRefresh = function(){
            $scope.myPromise =  $http
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

              $scope.goToInvoiceItemList = function(invoice){
                    $state.go('app.invoice_items',{invoice_id : invoice.invoice_id, invoice_status : invoice.invoice_status},{reload:false});

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
                    


                    
                    CrudOperation.update_no_redirect(params, data).success(function(){ //update without redirect function
                            var du = {
                              invoice_status : $scope.formData.invoice_status
                            }
                            var dt = {
                                      type : 'invoice_payments',
                                      primaryKey : 'invoice_id', 
                                      primaryKeyVal : $scope.formData.invoice_id,
                                      formData : du
                            }

                            var stateToRedirect = 'app.invoices';           // State that will redirect after update process success
                            CrudOperation.update(params, dt, stateToRedirect); //update with redirect function
                    }); 
                     



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

       /* invoice items ===================================================== */
              /*-------------------- select product and display into select option in add form ----------------- */
                var params = '/dataAll/type/products/format/json';
                  CrudOperation.get(params).success(function(data){  $scope.products = data.products;  });
              /*------------ end selection -----------------------------------------------------------------------*/ 


      /********************************* first modal *****************************/
      if($stateParams.invoice_id !== undefined && $stateParams.invoice_id !== null){
            var invoice_id = $stateParams.invoice_id,
                invoice_status = $stateParams.invoice_status;
            var params = '/dataAll/type/invoice_items/key/invoice_id/val/'+invoice_id+'/joinid/product_id/jointo/products/format/json';
                   $scope.myPromise =   CrudOperation.get(params).success(function(data){            
                      $scope.invoice_items   = data.invoice_items;
                      $scope.formData.invoice_id = invoice_id;
                      $scope.invoice_status = invoice_status;                      
                    });                     
        }

         // function ionic to call modal box
         // will triggered after add job task button clicked
        $ionicModal.fromTemplateUrl('modal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.modal = modal
        });

        var myModal = {
              title : '',
              type  : '',
              task : ''
        };
        $scope.myModal = {
              title : '',
              type  : ''
        };
        $scope.modal_show = function(data, type, title){
           console.log(type);
            
            if(type === "edit"){
                $scope.formData    = data;                
                $scope.edit_button = true;
                $scope.add_button  = false;                        
            }else if(type === "add")  { 
                $scope.add_button                      = true;
                $scope.edit_button                     = false;
                $scope.formData.invoice_item_description = "";
                $scope.formData.invoice_item_name        = "";
                $scope.formData.invoice_item_quantity    = "";
                $scope.formData.invoice_item_price       = "";
                $scope.formData.invoice_item_subtotal    = "";
                $scope.formData.invoice_item_discount    = "";
                $scope.formData.product_id             = "";
               
            }
                myModal.title = title;
                $scope.myModal.title = myModal.title;
                $scope.modal.show();

        } 
        $scope.modal_hide = function(type){
              $scope.modal.hide();
              $state.go($state.current,{},{reload:true}); 
        }

  /********************************* end first modal *****************************/

  /********************************* Second modal(choose product) *****************************/

            $ionicModal.fromTemplateUrl('modal_product.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.modal_product = modal
        });

        $scope.choose_product = function(){
          
                var product_id = $scope.modal_product.pro_id;              
                var params = '/dataAll/type/products/key/product_id/val/'+product_id+'/format/json';
                  CrudOperation.get(params).success(function(data){                    
                      $scope.formData.invoice_item_description = data.products[0].product_desc;
                      $scope.formData.invoice_item_name        = data.products[0].product_name;
                      $scope.formData.invoice_item_quantity    = data.products[0].product_quantity;
                      $scope.formData.invoice_item_price       = data.products[0].product_amount;
                      $scope.formData.invoice_item_subtotal    = data.products[0].product_quantity * data.products[0].product_amount;
                      $scope.formData.product_id               = data.products[0].product_id;

                      console.log($scope.formData);
                });  
                $scope.modal_product.hide();
        }

  /********************************* end Second modal(choose product) *****************************/
    $scope.addInvoiceItemData = function(){
          var params      = '/dataAll';                   // request Api link
          var data_data = {
                                        'product_id'                    : $scope.formData.product_id,
                                        'invoice_id'                    : $scope.formData.invoice_id,
                                        'invoice_item_name'             : $scope.formData.invoice_item_name,
                                        'invoice_item_description'      : $scope.formData.invoice_item_description,
                                        'invoice_item_price'            : $scope.formData.invoice_item_price,
                                        'invoice_item_quantity'         : $scope.formData.invoice_item_quantity,
                                        'invoice_item_discount'         : $scope.formData.invoice_item_discount,
                                        'invoice_item_subtotal'         : $scope.formData.invoice_item_subtotal
          }
          var data        = {                             // data sent to Api
                                type : "invoice_items", 
                                formData : data_data
                        };
          CrudOperation.add(params, data, '', false);
          $scope.modal.hide();
    }
    $scope.editInvoiceItemData = function(){
        var params     = '/dataAll';                  // request Api link
                    var dataUpdate = {                             // field column need to update
                                        'product_id'                  : $scope.formData.product_id,
                                        'invoice_item_name'             : $scope.formData.invoice_item_name,
                                        'invoice_item_description'      : $scope.formData.invoice_item_description,
                                        'invoice_item_price'            : $scope.formData.invoice_item_price,
                                        'invoice_item_quantity'         : $scope.formData.invoice_item_quantity,
                                        'invoice_item_discount'         : $scope.formData.invoice_item_discount,
                                        'invoice_item_subtotal'         : $scope.formData.invoice_item_subtotal
                        };
                    var data       = {                             // data sent to Api
                                      type : "invoice_items",
                                      primaryKey : 'invoice_item_id', 
                                      primaryKeyVal : $scope.formData.invoice_item_id,
                                      formData : dataUpdate
                        };
                    
                    $scope.modal.hide();
                    CrudOperation.update(params, data);
    }

    $scope.deleteItem = function(invoice_items){
      var params = '/dataAll/type/invoice_items/key/invoice_item_id/val/'+invoice_items.invoice_item_id;
                    CrudOperation.delete(params);
    }

    $scope.kira = function(){
         calculate_total();
    }

    function calculate_total(){
      
      if($scope.formData.invoice_item_discount == null || $scope.formData.invoice_item_discount == "" || $scope.formData.invoice_item_discount == undefined){
          var tot = $scope.formData.invoice_item_quantity * $scope.formData.invoice_item_price;
          $scope.formData.invoice_item_subtotal = tot;
      }else{
        var tot = $scope.formData.invoice_item_quantity * $scope.formData.invoice_item_price;
          $scope.formData.invoice_item_subtotal = tot;
          calculate_dis();
      }      
      
    }

    function calculate_dis(){
      var discount_tot = ($scope.formData.invoice_item_discount/100) * $scope.formData.invoice_item_subtotal;
          $scope.formData.invoice_item_subtotal = $scope.formData.invoice_item_subtotal - discount_tot;
    }


    /***************** Invoice Payment ***************/
    $ionicModal.fromTemplateUrl('modal_payments.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.modal_payment = modal
        });


    $scope.modal_payment_show = function(data, type, title){
           console.log(type);
            
            if(type === "edit"){
                $scope.formData    = data;                
                $scope.edit_button = true;
                $scope.add_button  = false;
                //$scope.invoice_payment_id =                         
            }else if(type === "add")  { 
                $scope.add_button                      = true;
                $scope.edit_button                     = false;
                $scope.formData.payment_id             = "";
                //$scope.invoice_id,
                $scope.formData.invoice_payment_amount = "";
                $scope.formData.invoice_payment_date   = "";
                $scope.formData.invoice_payment_note   = "";
                $scope.formData.invoice_payment_id     = "";
                //$scope.invoice_status
                 /*$scope.formData.invoice_item_description = "";
                $scope.formData.invoice_item_name        = "";
                $scope.formData.invoice_item_quantity    = "";
                $scope.formData.invoice_item_price       = "";
                $scope.formData.invoice_item_subtotal    = "";
                $scope.formData.invoice_item_discount    = "";
                $scope.formData.product_id             = "";*/
               
            }
                myModal.title = title;
                $scope.myModal.title = myModal.title;
                $scope.modal_payment.show();

        } 
        $scope.modal_payment_hide = function(type){
              $scope.modal_payment.hide();
              $state.go($state.current,{},{reload:true}); 
        }


    $scope.goToListPayment = function(a){
      //console.log($stateParams.invoice_id);
      //var invoice_id = $scope.formData.invoice_id;
      var invoice_id = $stateParams.invoice_id;
      var invoice_status = $scope.invoice_status;
      $state.go('app.invoice_payments',{invoice_id : invoice_id, invoice_status : invoice_status},{reload:false});
    }

    if($stateParams.invoice_status != undefined && $stateParams.invoice_status != ""){
       var params = '/dataAll/type/invoice_payments/key/invoice_id/val/'+$stateParams.invoice_id+'/joinid/payment_id/jointo/payments/format/json';
       $scope.myPromise = CrudOperation.get(params).success(function(data){            
                      $scope.invoice_payments   = data.invoice_payments;
                      $scope.invoice_id = $stateParams.invoice_id;
                      $scope.invoice_status = $stateParams.invoice_status; 

                      /* display total, overdue and paid status */
                      var paid_total = 0; 
                      for(var a = 0; a < data.invoice_payments.length; a++){
                          paid_total = (paid_total + parseInt(data.invoice_payments[a].invoice_payment_amount));
                           
                      }
                      $scope.paid_invoice = paid_total;    


                      var params = '/dataAll/type/invoice_items/key/invoice_id/val/'+$stateParams.invoice_id+'/format/json';
                      CrudOperation.get(params).success(function(data){

                          var total_due = 0;                           
                          for(var b = 0; b < data.invoice_items.length; b++){
                              total_due = (total_due + parseInt(data.invoice_items[b].invoice_item_subtotal));
                               
                          } 
                          $scope.total_due = total_due;
                          $scope.due = (total_due - paid_total);
                            //console.log(total_due);
                      });    
                    });   
    }

    

    var params = '/dataAll/type/payments/format/json';
        CrudOperation.get(params).success(function(data){  $scope.payment_methods   = data.payments; });   


    $scope.addInvoicePaymentData = function(){

        var params      = '/dataAll';                   // request Api link
          var data_data = {
                                        'payment_id'                    : $scope.formData.payment_id,
                                        'invoice_id'                    : $scope.invoice_id,
                                        'invoice_payment_amount'        : $scope.formData.invoice_payment_amount,
                                        'invoice_payment_date'          : $scope.formData.invoice_payment_date,
                                        'invoice_payment_note'          : $scope.formData.invoice_payment_note,
                                        'invoice_status'                : $scope.invoice_status
          }
          var data        = {                             // data sent to Api
                                type : "invoice_payments", 
                                formData : data_data
                        };
          CrudOperation.add(params, data, '', false);
          $scope.modal_payment.hide();
    }

    $scope.editInvoicePaymentData = function(){
         var params     = '/dataAll';                  // request Api link
                    var dataUpdate = {                             // field column need to update
                                        'payment_id'                    : $scope.formData.payment_id,
                                        'invoice_payment_amount'        : $scope.formData.invoice_payment_amount,
                                        'invoice_payment_date'          : $scope.formData.invoice_payment_date,
                                        'invoice_payment_note'          : $scope.formData.invoice_payment_note,
                                        'invoice_status'                : $scope.invoice_status
                        };
                    var data       = {                             // data sent to Api
                                      type : "invoice_payments",
                                      primaryKey : 'invoice_payment_id', 
                                      primaryKeyVal : $scope.formData.invoice_payment_id,
                                      formData : dataUpdate
                        };
                    
                    $scope.modal_payment.hide();
                    CrudOperation.update(params, data, '', true);

                    /*$scope.$watch('$scope.formData.payment_id', function(){
                      $scope.formData.payment_id = $scope.formData.payment_id;
                    }, true);*/
    }


    $scope.backToInvoiceItem = function(){
      $state.go('app.invoice_items',{invoice_id : $scope.invoice_id, invoice_status : $scope.invoice_status},{reload:false});
    }

    $scope.deletePayment = function(invoice_payments){
        var params = '/dataAll/type/invoice_payments/key/invoice_payment_id/val/'+invoice_payments.invoice_payment_id;
            CrudOperation.delete(params);
    }
    

    $scope.backHome = function(){
        UniversalFunction.home_button();
    }


}]);
          