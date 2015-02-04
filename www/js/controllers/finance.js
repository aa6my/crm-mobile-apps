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

var apps_finance = angular.module('financeModule', ['ionic']);
    apps_finance.controller('Finance',['$scope','$http', '$state','$ionicPopup', 'Settings', 'init', 'Auth', 'UniversalFunction', 'CrudOperation',function($scope,$http, $state,$ionicPopup, Settings, init, Auth, UniversalFunction, CrudOperation) {
       
          /*=============== Lead(initial start of page will call this part) ============================= */
        if(typeof analytics !== "undefined") { analytics.trackView("Finance"); }
        
        var params = '/dataAll/type/customers/format/json';
                  CrudOperation.get(params).success(function(data){ 
                    
                    var km = [{}];
                    for(var g = 0; g < data.customers.length; g++){
                      
                      km.push({ customer_name : data.customers[g].customer_name, customer_id : parseInt(data.customers[g].customer_id)});
                      
                    }
                    km.splice(0,1);
                    $scope.selected = undefined;
                    $scope.statesWithFlags = km;
                    
            });

          $scope.openDatePicker  = function($event, ng_open_name){
            //console.log(ng_open_name);
                    $scope.openFor = {};
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.openFor[ng_open_name] = true;    

          }
                    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy','yyyy-MM-dd', 'shortDate'];
                    $scope.format  = $scope.formats[3];


          $scope.search_data = function(finance_obj){

              var start_date =  UniversalFunction.convert_to_date(String(finance_obj.start_date)),
                  end_date   =  UniversalFunction.convert_to_date(String(finance_obj.end_date));

            var params = '/finance/user/'+finance_obj.customer.customer_id+'/start_date/'+start_date+'/end_date/'+end_date+'/format/json';
                  CrudOperation.get(params).success(function(data){ 
                    
                    console.log(data);
                    
            });
         
          


        }


      }])

