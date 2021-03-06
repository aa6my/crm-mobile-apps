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
 * @package    lead.js
 * @author     Nizam <nizam@segimidae.net>
 * @author     Norlihazmey <norlihazmey@segimidae.net>
 * @author     Azim <azim@segimidae.net>
 * @license    SeGi MiDae
 * @copyright  2015 SEGI MiDae
 * @version    0.5.1
*/

var apps_lead = angular.module('leadModule', ['ionic','cgBusy']);
    apps_lead.controller('Lead',['$scope','$http', '$state','$ionicPopup', 'Settings', 'init', 'Auth', 'UniversalFunction', 'CrudOperation',function($scope,$http, $state,$ionicPopup, Settings, init, Auth, UniversalFunction, CrudOperation) {
       
          /*=============== Lead(initial start of page will call this part) ============================= */
        if(typeof analytics !== "undefined") { analytics.trackView("Leads"); }
        /*-------------- initial value for page to show or hide button in lead form add/edit-------------*/
        var m = UniversalFunction.returnButtonOnly();
        $scope.btnAdd = m.add;
        $scope.btnEdit = m.edit;
        /*---------------------------*/

        /*------------initial value for form data of update function ----*/
        $scope.formData = UniversalFunction.returnDisplayFormData();
        /*---------------------------------------------------------------*/
        
         var url = Settings.url + '/dataAll/type/leads/format/json';

         $scope.myPromise =  $http
                .get(url, Auth.doAuth(init.username, init.password))
                .success(function(data){
                 
                    $scope.leads = UniversalFunction.redraw(data.leads);
                    
              }, function(err) {
                  console.error('ERR', err);
              
              })
                    
            $scope.doRefresh = function(){
              $http
                .get(url, Auth.doAuth(init.username, init.password))
                .success(function(data){
                  
                    $scope.leads = UniversalFunction.redraw(data.leads);

              })
              .finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
              });
            };

            /*-------------------- select country name and display into select option in add form ----------------- */
              var params = '/dataAll/type/country/format/json';
                  CrudOperation.get(params).success(function(data){  $scope.country_list = data.country;  });
              /*------------ end selection ---------------------------------------------------------------------------*/
               
              $scope.goToAddDataPage = function(){

                   $state.go('app.leadAdd_Edit',{},{reload:false});
                   /*------------- If click add new button show only submit button with save function--------------*/
                   var m = UniversalFunction.buttonOnly(true,false);
                   $scope.btnAdd = m.add;
                   $scope.btnEdit = m.edit;
                   /*---------------------------*/
                   /*---- set form value to blank */
                   UniversalFunction.displayFormData('');
                   
                  
              }

               $scope.goToEditDataPage = function(leads){

                    $state.go('app.leadAdd_Edit',{},{reload:false});
                    /*-------------If click edit button show only save button with edit function--------------*/
                    var n           = UniversalFunction.buttonOnly(false,true);
                    $scope.btnAdd   = n.add;
                    $scope.btnEdit  = n.edit;
                    /*---------------------------*/
                    /*-- display value form list into update form */
                    var b           = UniversalFunction.displayFormData(leads);
                    $scope.formData = b;
                    
              }

          
 
          /*================================ Add function ================================*/
                $scope.addData  = function(){

                    $scope.formData = {};                           // store data from form into formData onject
                    var params      = '/dataAll';                   // request Api link
                    var data        = {                             // data sent to Api
                                        type : "leads", 
                                        formData : this.formData
                        };
                    var stateToRedirect = 'app.leads';
                    CrudOperation.add(params, data, stateToRedirect);  

                } 
        /*================================ End Add function ================================*/




        /*================================ Edit function ================================*/
                $scope.editData = function(){

                    var params     = '/dataAll';                  // request Api link
                    var dataUpdate = {                             // field column need to update
                                        lead_name : $scope.formData.lead_name,
                                        lead_firstname : $scope.formData.lead_firstname,
                                        lead_lastname : $scope.formData.lead_lastname,
                                        lead_email : $scope.formData.lead_email,
                                        lead_phone : $scope.formData.lead_phone,
                                        lead_mobile : $scope.formData.lead_mobile,
                                        lead_fax : $scope.formData.lead_fax,
                                        lead_address : $scope.formData.lead_address,
                                        lead_postcode : $scope.formData.lead_postcode,
                                        lead_state : $scope.formData.lead_state,
                                        country_id : $scope.formData.country_id
                        };
                    var data       = {                             // data sent to Api
                                      type : "leads",
                                      primaryKey : 'lead_id', 
                                      primaryKeyVal : $scope.formData.lead_id,
                                      formData : dataUpdate
                        };
                    var stateToRedirect = 'app.leads';           // State that will redirect after update process success
                    CrudOperation.update(params, data, stateToRedirect);  
                } 
        /*================================ End Edit function ================================*/




        /*================================ Delete function ================================*/
                $scope.deleteData = function(lead) {
                    var params = '/dataAll/type/leads/key/lead_id/val/'+lead.lead_id;
                    CrudOperation.delete(params);
                }
          /*================================ End Delete function ================================*/

          /*================================ Back function ================================*/
                 $scope.backLead = function() {
                    $state.go('app.leads');

                  }
          /*================================ End back function ================================*/

                $scope.backHome = function(){
                  UniversalFunction.home_button();
                }


      }]);

