var apps = angular.module('jobModule', []);
	
	apps.controller('Job', function($scope,$http, $state,$ionicPopup, Settings, init, Auth, UniversalFunction, CrudOperation) {
    url = Settings.url + '/dataAll/type/jobs/format/json';
        $http.get(url, Auth.doAuth(init.username, init.password)).
        success(function(data) {
          $scope.jobs = data.jobs;
          console.log('Success', data.jobs);
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
      
      

      $scope.goToAddDataPage = function(){ $state.go('app.jobs_main',{},{reload:false});}
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



        /*================================ Delete function ================================*/
                $scope.deleteData = function(job) {
                    var params = '/dataAll/type/jobs/key/job_id/val/'+job.job_id;
                    CrudOperation.delete(params);
                }
          /*================================ End Delete function ================================*/





})