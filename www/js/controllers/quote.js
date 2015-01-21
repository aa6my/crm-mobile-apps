var apps = angular.module('quoteModule', ['ionic','ui.bootstrap']);
    apps.controller('Quote',function($scope,$http, $state,$ionicPopup,$ionicModal, $stateParams, Settings, init, Auth, UniversalFunction, CrudOperation) {
       
          /*=============== quote(initial start of page will call this part) ============================= */
        
        /*-------------- initial value for page to show or hide button in quote form add/edit-------------*/
        var m = UniversalFunction.returnButtonOnly();
        $scope.btnAdd = m.add;
        $scope.btnEdit = m.edit;
        /*---------------------------*/

        /*------------initial value for form data of update function ----*/
        $scope.formData = UniversalFunction.returnDisplayFormData();
        /*---------------------------------------------------------------*/
        
         var url = Settings.url + '/dataAll/type/quotes/format/json';
             
             $http
                .get(url, Auth.doAuth(init.username, init.password))
                .success(function(data){
                 
                    $scope.quotes = UniversalFunction.redraw(data.quotes);
                    
              }, function(err) {
                  console.error('ERR', err);
              
              })
                    
            $scope.doRefresh = function(){
              $http
                .get(url, Auth.doAuth(init.username, init.password))
                .success(function(data){
                  
                    $scope.quotes = UniversalFunction.redraw(data.quotes);

              })
              .finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
              });
            };

               
              $scope.goToAddDataPage = function(){

                   $state.go('app.quoteAdd_Edit',{},{reload:false});
                   /*------------- If click add new button show only submit button with save function--------------*/
                   var m          = UniversalFunction.buttonOnly(true,false);
                   $scope.btnAdd  = m.add;
                   $scope.btnEdit = m.edit;
                   /*---------------------------*/
                   /*---- set form value to blank */
                   UniversalFunction.displayFormData('');
                   
                  
              }

               $scope.goToEditDataPage = function(quotes){

                    $state.go('app.quoteAdd_Edit',{},{reload:false});
                    /*-------------If click edit button show only save button with edit function--------------*/
                    var n           = UniversalFunction.buttonOnly(false,true);
                    $scope.btnAdd   = n.add;
                    $scope.btnEdit  = n.edit;
                    /*---------------------------*/
                    /*-- display value form list into update form */
                    var b           = UniversalFunction.displayFormData(quotes);
                    $scope.formData = b;
                    
              }

                $scope.goToQuoteItemList = function(quote){
                    $state.go('app.quote_items',{quote_id : quote.quote_id},{reload:false});

                }

                $scope.backToQuote = function(){
                  $state.go('app.quotes');
                }

          
 
          /*================================ Add function ================================*/
                $scope.addData  = function(){

                    $scope.formData = {};                           // store data from form into formData onject
                    var params      = '/dataAll';                   // request Api link
                    var data        = {                             // data sent to Api
                                        type : "quotes", 
                                        formData : this.formData
                        };
                    var stateToRedirect = 'app.quotes';
                    CrudOperation.add(params, data, stateToRedirect);  

                } 
        /*================================ End Add function ================================*/




        /*================================ Edit function ================================*/
                $scope.editData = function(){

                    var params     = '/dataAll';                  // request Api link
                    var dataUpdate = {                             // field column need to update
                                        quote_subject         : $scope.formData.quote_subject,
                                        quote_date_created    : $scope.formData.quote_date_created,
                                        quote_valid_until     : $scope.formData.quote_valid_until,
                                        quote_discount        : $scope.formData.quote_discount,
                                        quote_customer_notes  : $scope.formData.quote_customer_notes,
                                        quote_status          : $scope.formData.quote_status


                        };
                    var data       = {                             // data sent to Api
                                      type : "quotes",
                                      primaryKey : 'quote_id', 
                                      primaryKeyVal : $scope.formData.quote_id,
                                      formData : dataUpdate
                        };
                    var stateToRedirect = 'app.quotes';           // State that will redirect after update process success
                    CrudOperation.update(params, data, stateToRedirect);  
                } 
        /*================================ End Edit function ================================*/




        /*================================ Delete function ================================*/
                $scope.deleteData = function(quote) {
                    var params = '/dataAll/type/quotes/key/quote_id/val/'+quote.quote_id;
                    CrudOperation.delete(params);
                }
          /*================================ End Delete function ================================*/

          /*================================ Back function ================================*/
                 $scope.backQuote = function() {
                    $state.go('app.quotes');

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


      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy','yyyy-MM-dd', 'shortDate'];
      $scope.format  = $scope.formats[3];

      /* quote items ===================================================== */
              /*-------------------- select product and display into select option in add form ----------------- */
                var params = '/dataAll/type/products/format/json';
                  CrudOperation.get(params).success(function(data){  $scope.products = data.products;  });
              /*------------ end selection -----------------------------------------------------------------------*/ 


      /********************************* first modal *****************************/
      if($stateParams.quote_id !== undefined && $stateParams.quote_id !== null){
            var quote_id = $stateParams.quote_id;
            var params = '/dataAll/type/quote_items/key/quote_id/val/'+quote_id+'/joinid/product_id/jointo/products/format/json';
                      CrudOperation.get(params).success(function(data){            
                      $scope.quote_items   = data.quote_items;
                      $scope.formData.quote_id = quote_id;                      
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
                $scope.formData.quote_item_description = "";
                $scope.formData.quote_item_name        = "";
                $scope.formData.quote_item_quantity    = "";
                $scope.formData.quote_item_price       = "";
                $scope.formData.quote_item_subtotal    = "";
                $scope.formData.product_id               = "";
               
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
          //console.log($scope.modal_product.pro_id);
                var product_id = $scope.modal_product.pro_id;              
                var params = '/dataAll/type/products/key/product_id/val/'+product_id+'/format/json';
                  CrudOperation.get(params).success(function(data){                    
                      $scope.formData.quote_item_description = data.products[0].product_desc;
                      $scope.formData.quote_item_name        = data.products[0].product_name;
                      $scope.formData.quote_item_quantity    = data.products[0].product_quantity;
                      $scope.formData.quote_item_price       = data.products[0].product_amount;
                      $scope.formData.quote_item_subtotal    = data.products[0].product_quantity * data.products[0].product_amount;
                      $scope.formData.product_id             = data.products[0].product_id;
                });  
                $scope.modal_product.hide();
        }

  /********************************* end Second modal(choose product) *****************************/
    $scope.addQuoteItemData = function(){
          var params      = '/dataAll';                   // request Api link
          var data_data = {
                                        'product_id'                  : $scope.formData.product_id,
                                        'quote_id'                    : $scope.formData.quote_id,
                                        'quote_item_name'             : $scope.formData.quote_item_name,
                                        'quote_item_description'      : $scope.formData.quote_item_description,
                                        'quote_item_price'            : $scope.formData.quote_item_price,
                                        'quote_item_quantity'         : $scope.formData.quote_item_quantity,
                                        'quote_item_discount'         : $scope.formData.quote_item_discount,
                                        'quote_item_subtotal'         : $scope.formData.quote_item_subtotal
          }
          var data        = {                             // data sent to Api
                                type : "quote_items", 
                                formData : data_data
                        };
          CrudOperation.add(params, data, '', false);
          $scope.modal.hide();
    }
    $scope.editQuoteItemData = function(){
        var params     = '/dataAll';                  // request Api link
                    var dataUpdate = {                             // field column need to update
                                        'product_id'                  : $scope.formData.product_id,
                                        'quote_item_name'             : $scope.formData.quote_item_name,
                                        'quote_item_description'      : $scope.formData.quote_item_description,
                                        'quote_item_price'            : $scope.formData.quote_item_price,
                                        'quote_item_quantity'         : $scope.formData.quote_item_quantity,
                                        'quote_item_discount'         : $scope.formData.quote_item_discount,
                                        'quote_item_subtotal'         : $scope.formData.quote_item_subtotal
                        };
                    var data       = {                             // data sent to Api
                                      type : "quote_items",
                                      primaryKey : 'quote_item_id', 
                                      primaryKeyVal : $scope.formData.quote_item_id,
                                      formData : dataUpdate
                        };
                    
                    $scope.modal.hide();
                    CrudOperation.update(params, data);
    }

    $scope.deleteItem = function(quote_items){
      var params = '/dataAll/type/quote_items/key/quote_item_id/val/'+quote_items.quote_item_id;
                    CrudOperation.delete(params);
    }

    $scope.kira = function(){
         calculate_total();
    }

    function calculate_total(){
      
      if($scope.formData.quote_item_discount == null || $scope.formData.quote_item_discount == "" || $scope.formData.quote_item_discount == undefined){
          var tot = $scope.formData.quote_item_quantity * $scope.formData.quote_item_price;
          $scope.formData.quote_item_subtotal = tot;
      }else{
        var tot = $scope.formData.quote_item_quantity * $scope.formData.quote_item_price;
          $scope.formData.quote_item_subtotal = tot;
          calculate_dis();
      }      
      
    }

    function calculate_dis(){
      var discount_tot = ($scope.formData.quote_item_discount/100) * $scope.formData.quote_item_subtotal;
          $scope.formData.quote_item_subtotal = $scope.formData.quote_item_subtotal - discount_tot;
    }


    $scope.convert_to_invoice = function(quote_items){
      
      
      var quote_details = {};
      var params = '/dataAll/type/quotes/key/quote_id/val/'+quote_items[0].quote_id+'/format/json';
          CrudOperation.get(params).success(function(data){  
               
                  var obj_size    = quote_items.length,
                      params      = '/dataAll',
                      quote_details = data.quotes,
                      data_data = [],
                      data_items = {};           
                      data_data = {
                                      'customer_id'               : quote_details[0].customer_id,
                                      'invoice_subject'           : quote_details[0].quote_subject,
                                      'invoice_date_created'      : quote_details[0].quote_date_created,                                      
                                      'invoice_customer_notes'    : quote_details[0].quote_customer_notes,
                                      'invoice_valid_until'       : quote_details[0].quote_valid_until,
                                      'invoice_status'            : quote_details[0].quote_status
                                  };
                      var params = '/dataAll';
                      var data = {type:'invoices', formData : data_data};
                      CrudOperation.add(params, data, '', false);

                       var params = '/dataInvoice/format/json';
                      CrudOperation.get(params).success(function(a){


                                            var obj_size    = quote_items.length;
                                            var b = 'invoice_items';
                                                for(var i = 1; i < obj_size; i++){
                                                  b+= '-invoice_items';
                                                }
                                      
                                            var data = {type:'', formData : ''};
                                                data.type = b;
                                                
                                                var qi = [];

                                                    for(var md = 0; md < quote_items.length; md++){
                                                      qi[md] = {
                                                        invoice_id : a.invoices.invoice_id,
                                                        product_id : quote_items[md].product_id,
                                                        invoice_item_name : quote_items[md].quote_item_name,
                                                        invoice_item_description : quote_items[md].quote_item_description,
                                                        invoice_item_price : quote_items[md].quote_item_price,
                                                        invoice_item_quantity : quote_items[md].quote_item_quantity,
                                                        invoice_item_discount : quote_items[md].quote_item_discount,
                                                        invoice_item_subtotal : quote_items[md].quote_item_subtotal

                                                      }
                                                      
                                                    }
                                                   qi.push(data_data);
                                                   data.formData = qi;
                                                   var params = '/dataAll';
                                                   CrudOperation.add(params, data, '', false);
                        

                      });
                  



                      //console.log(data);
                 

                  //console.log(settings);

          });

      
      
      
    }

    //console.log(Settings.url);
      
})

