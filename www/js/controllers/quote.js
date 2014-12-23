var apps = angular.module('quoteModule', ['ionic','ui.bootstrap']);
    apps.controller('Quote',function($scope,$http, $state,$ionicPopup, Settings, init, Auth, UniversalFunction, CrudOperation) {
       
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
                    $scope.quotes = data.quotes;
                
                    $scope.doRefresh = function(){
                      $http
                        .get(url, Auth.doAuth(init.username, init.password))
                        .success(function(data){
                            $scope.quotes = data.quotes;
                        })
                        .finally(function(){
                            $scope.$broadcast('scroll.refreshComplete');
                       });
                    };
              }, function(err) {
                  console.error('ERR', err);
              
              })

               
              $scope.goToAddDataPage = function(){

                   $state.go('app.quoteAdd_Edit',{},{reload:false});
                   /*------------- If click add new button show only submit button with save function--------------*/
                   var m = UniversalFunction.buttonOnly(true,false);
                   $scope.btnAdd = m.add;
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
                                        quote_subject : $scope.formData.quote_subject,
                                        quote_date_created : $scope.formData.quote_date_created,
                                        quote_valid_until : $scope.formData.quote_valid_until,
                                        quote_discount : $scope.formData.quote_discount,
                                        quote_customer_notes : $scope.formData.quote_customer_notes,
                                        quote_status : $scope.formData.quote_status


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



  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];


      })

