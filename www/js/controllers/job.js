var apps = angular.module('jobModule', []);
	

	apps.controller('Job', function($scope,$http, $state,$ionicPopup, Settings, init, Auth, UniversalFunction, CrudOperation) {

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
                      $scope.btnAdd = m.add;
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

                    $state.go('app.jobs_task',{},{reload:false});
                    /*-------------------- select job type and display into select option in add form ----------------- */
                    var job_task_list = [];
                    var params = '/dataAll/type/jobs_task/key/job_id/val/'+jobs.job_id+'/format/json';
                    CrudOperation.get(params).success(function(data){  job_task_list.push(data.jobs_task);  });
                    console.log(job_task_list);
                   /*------------ end selection ---------------------------------------------------------------------------*/

      }
      $scope.openDatePicker  = function($event, ng_open_name){
                    $scope.openFor = {};
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.openFor[ng_open_name] = true;      
      }
      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy','yyyy-MM-dd', 'shortDate'];
      $scope.format  = $scope.formats[3];



      /*================================ Add function ================================*/
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
        /*================================ End Add function ================================*/


        /*================================ Edit function ================================*/
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





})