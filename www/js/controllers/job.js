var apps = angular.module('jobModule', ['ionic']);
	

	apps.controller('Job', function($scope,$http, $state,$ionicPopup,$ionicModal,$stateParams, Settings, init, Auth, UniversalFunction, CrudOperation, jobService) {

       

       /*-------------- initial value for page to show or hide button in vendor form add/edit-------------*/
        var m = UniversalFunction.returnButtonOnly();
        $scope.btnAdd = m.add;
        $scope.btnEdit = m.edit;
        /*---------------------------*/
        

        /*------------initial value for form data of update function ----*/
        $scope.formData = UniversalFunction.returnDisplayFormData();
        /*---------------------------------------------------------------*/

    url = Settings.url + '/dataAll/type/jobs/format/json';
        $http.get(url, Auth.doAuth(init.username, init.password)).
        success(function(data) {
          $scope.jobs = data.jobs;
          //console.log('Success', data.jobs);
      $scope.doRefresh = function() {
        $http.get(url, Auth.doAuth(init.username, init.password))
         .success(function(data) {
           $scope.jobs = data.jobs;
         })
         .finally(function() {
           $scope.$broadcast('scroll.refreshComplete');
         });
      };
  }, function(err) {console.error('ERR', err);})

        //$scope.job_task_list = {};

      /*-------------------- select job type and display into select option in add form ----------------- */
              var params = '/dataAll/type/job_types/format/json';
                    CrudOperation.get(params).success(function(data){  $scope.job_types = data.job_types;  });
      /*------------ end selection ---------------------------------------------------------------------------*/

      /*-------------------- select user meta and display into select option in add form ----------------- */
              var params = '/dataAll/type/user_meta/format/json';
                    CrudOperation.get(params).success(function(data){  $scope.user_meta = data.user_meta;  });
      /*------------ end selection ---------------------------------------------------------------------------*/

      /*-------------------- select websites and display into select option in add form ----------------- */
              var params = '/dataAll/type/websites/format/json';
                    CrudOperation.get(params).success(function(data){  $scope.websites = data.websites;  });
      /*------------ end selection ---------------------------------------------------------------------------*/

      /*-------------------- select customers and display into select option in add form ----------------- */
              var params = '/dataAll/type/customers/format/json';
                    CrudOperation.get(params).success(function(data){  $scope.customers = data.customers;  });
      /*------------ end selection ---------------------------------------------------------------------------*/


      /*----- ng-switch code = for multiple form step --*/
                    $scope.step     = 'step1';
      $scope.goToStep = function(step){
                    $scope.step     = step;
                    $scope.formData = this.formData;  // When click next or back button, retain the value of form form previous entering

      }/*--- end ng-switch --*/
      
      

      $scope.goToAddDataPage = function(){ 
                    $state.go('app.jobs_main',{},{reload:false});
                    var m = UniversalFunction.buttonOnly(true,false);
                    $scope.btnAdd  = m.add;
                    $scope.btnEdit = m.edit;

                /*---- set form value to blank */
                    UniversalFunction.displayFormData('');
                
      }

      $scope.goToEditDataPage = function(jobs){

                    $state.go('app.jobs_main',{},{reload:false});
                    /*-------------If click edit button show only save button with edit function--------------*/
                    var n           = UniversalFunction.buttonOnly(false,true);
                    $scope.btnAdd   = n.add;
                    $scope.btnEdit  = n.edit;
                    /*---------------------------*/
                    /*-- display value form list into update form */
                    var b           = UniversalFunction.displayFormData(jobs);
                    $scope.formData = b;

                    $scope.formData.job_type_id = b.job_type_id;
                    //console.log(b.job_type_id);
                    
      }
      $scope.goToJobTaskList = function(jobs){
         // jobTaskList(1);
                    $state.go('app.jobs_task',{job_id : jobs.job_id, job_hour : jobs.job_hour},{reload:false});


      }
      $scope.backToJob = function() {
                    $state.go('app.jobs');

      }           
      $scope.openDatePicker  = function($event, ng_open_name){
                    $scope.openFor = {};
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.openFor[ng_open_name] = true;      
      }
                    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy','yyyy-MM-dd', 'shortDate'];
                    $scope.format  = $scope.formats[3];



      /*================================ Add Job function ================================*/
                $scope.addData  = function(){
                    //$scope.formData = {};                           // store data from form into formData onject
                    var params      = '/dataAll';                   // request Api link
                    var data        = {                             // data sent to Api
                                        type : "jobs", 
                                        formData : this.formData
                        };
                    var stateToRedirect = 'app.jobs';
                    CrudOperation.add(params, data, stateToRedirect);
                } 
        /*================================ End Add Job function ================================*/


        /*================================ Edit Job function ================================*/
                $scope.editData = function(){

                    var params     = '/dataAll';                  // request Api link
                    var dataUpdate = {                             // field column need to update
                                        'customer_id'         : $scope.formData.customer_id,
                                        'website_id'          : $scope.formData.website_id,
                                        'job_title'           : $scope.formData.job_title,
                                        'job_date_start'      : $scope.formData.job_date_start,
                                        'job_start_time'      : $scope.formData.job_start_time,
                                        'job_end_time'        : $scope.formData.job_end_time,
                                        'job_due_date'        : $scope.formData.job_due_date,
                                        'job_complete_date'   : $scope.formData.job_complete_date,
                                        'user_id'             : $scope.formData.user_id,
                                        'job_tax'             : $scope.formData.job_tax,
                                        /*'job_currency'        => $scope.formData.job_currency'],*/
                                        'job_type_id'         : $scope.formData.job_type_id,
                                        'job_status'          : $scope.formData.job_status,
                                        'job_description'     : $scope.formData.job_description,
                                        'job_note'            : $scope.formData.job_note,
                                        'job_hour'            : $scope.formData.job_hour,
                                        'job_quote_date'      : $scope.formData.job_quote_date,
                                        'job_renewal_date'    : $scope.formData.job_renewal_date,
                                        'job_task_type'       : $scope.formData.job_task_type,
                                        'job_discount_amount' : $scope.formData.job_discount_amount,
                                        'job_discount_name'   : $scope.formData.job_discount_name,
                                        'job_discount_type'   : $scope.formData.job_discount_type
                        };
                    var data       = {                             // data sent to Api
                                      type : "jobs",
                                      primaryKey : 'job_id', 
                                      primaryKeyVal : $scope.formData.job_id,
                                      formData : dataUpdate
                        };
                    var stateToRedirect = 'app.jobs';           // State that will redirect after update process success
                    CrudOperation.update(params, data, stateToRedirect);  
                } 
        /*================================ End Edit function ================================*/

        /*================================ Delete function ================================*/
                $scope.deleteData = function(job) {
                    var params = '/dataAll/type/jobs/key/job_id/val/'+job.job_id;
                    CrudOperation.delete(params);
                }
          /*================================ End Delete function ================================*/


         /*================================ job task part ================================*/ 

         // function ionic to call modal box
         // will triggered after add job task button clicked
        $ionicModal.fromTemplateUrl('modal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.modal = modal
        }) 
        // function ionic to hide modal box
        // will trigger when cancel button clicked
        // after that clear the form data to empty field 
        function clear_job_task_form(){
              $scope.formData.job_task_description = "";
              $scope.formData.job_task_hour        = "";
              $scope.formData.job_task_amount      = "";
              $scope.formData.job_task_due_date    = "";
              $scope.formData.user_id              = "";
              $scope.formData.job_task_percentage  = "";
        }


        var myModal = {
              title : '',
              type  : ''
        };
        $scope.myModal = {
              title : '',
              type  : ''
        };


        $scope.modal_hide = function(type){
            //console.log(myModal.type);
              $scope.modal.hide();
              $scope.p_description = false;
              $scope.n_description = false;

              
            
        }
        $scope.modal_show = function(data, type, title){
           console.log(type);
            if(type === "edit"){
                $scope.formData  = data; 
                $scope.original = true; 
                $scope.n_description = false;
                $scope.b_description = false; 
                $scope.edit_description = true;            
            }else if(type === "add")   {
                $scope.original = false;
                $scope.b_description = true; 
            }
              myModal.title = title;
              myModal.type = type;         
              $scope.myModal.title = myModal.title;
              $scope.myModal.type  = myModal.type;
              $scope.modal.show();

        }
        // Display job task in job_task.html page
        // $stateParams.job_id came from $scope.goToJobTaskList function
        // Must include paramter name in app.js for paramater declaration
        if($stateParams.job_id !== undefined && $stateParams.job_id !== null){
            var job_id = $stateParams.job_id;
            var params = '/dataAll/type/jobs_task/key/job_id/val/'+job_id+'/joinid/product_id/jointo/products/format/json';
                      CrudOperation.get(params).success(function(data){            
                      $scope.job_task_list   = data.jobs_task; 
                      $scope.formData.job_id = job_id;
                      $scope.job_hour        = $stateParams.job_hour;
                    });                     
        }
          // show field either text field or select drop down list
          // for job description & job task hour & job task amount. 
          $scope.show_field = function(view_type, type){
                console.log(myModal.type);
            if($scope.formData.job_task_description != "" || $scope.formData.job_task_amount !="" || $scope.formData.job_task_hour != "" || $scope.formData.job_task_description != null){
                $scope.formData.job_task_description = "";
                $scope.formData.job_task_hour        = "";
                $scope.formData.job_task_amount      = "";
            }            
            if(view_type == 'product'){
                $scope.p_description = true;
                $scope.n_description = false;
                $scope.edit_description = false;  
               /*-------------------- select product and display into select option in add form ----------------- */
                var params = '/dataAll/type/products/format/json';
                  CrudOperation.get(params).success(function(data){  $scope.products = data.products;  });
              /*------------ end selection -----------------------------------------------------------------------*/            
            }else{                
                $scope.n_description = true;
                $scope.p_description = false;              
            }

            //console.log(type);
          }
          /*================================ Add job task function ================================*/
                $scope.addTaskData  = function(){
                    
                    var params      = '/dataAll';                   // request Api link
                    var data        = {                             // data sent to Api
                                        type : "jobs_task", 
                                        formData : this.formData
                        };
                    CrudOperation.add(params, data, '', true);
                    $scope.modal.hide();
                }       
        /*================================ End Delete function ================================*/
        $scope.choose_value = function(product_id){
          /*-------------------- select product data by product id then insert into description ----------------- */
              var params = '/dataAll/type/products/key/product_id/val/'+product_id+'format/json';
                  CrudOperation.get(params).success(function(data){  
                    $scope.formData.job_task_description = data.products[0].product_name;
                    $scope.formData.job_task_amount      = data.products[0].product_amount;
                    $scope.formData.job_task_hour        = data.products[0].product_quantity; 
              });
          /*------------ end selection ---------------------------------------------------------------------------*/
        }

        $scope.calculate_amount = function(hour, job_hour){
                 $scope.formData.job_task_amount = hour * job_hour;
        }


});
