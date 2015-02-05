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
 * @package    main.js
 * @author     Nizam <nizam@segimidae.net>
 * @author     Norlihazmey <norlihazmey@segimidae.net>
 * @author     Azim <azim@segimidae.net>
 * @license    SeGi MiDae
 * @copyright  2015 SEGI MiDae
 * @version    0.5.1
*/

var apps_main = angular.module('mainModule', ['ionic','highcharts-ng']);
    apps_main.controller('mainController',['$scope','$http', '$state','$ionicPopup', 'Settings', 'init', 'Auth', 'UniversalFunction', 'CrudOperation',function($scope,$http, $state,$ionicPopup, Settings, init, Auth, UniversalFunction, CrudOperation) {
    
    if(typeof analytics !== "undefined") { analytics.trackView("Dashboard"); }
    

    var tarikh = new Date();
    var tahun = tarikh.getFullYear();

    //console.log($(window).width());
    displayChart(tahun);

    $scope.years = [];
    var end_year = 2020;

        for (var i = 2012; i < end_year; i++) {
            $scope.years.push(i);
        };


    $scope.changeYear = function(year){
        displayChart(year);
    }

    function displayChart(year){

        if(year==undefined || year==null || year==""){
            var tarikh = new Date();
            var tahun = tarikh.getFullYear(); 
            var params = '/dataChart/year/'+tahun+'/format/json';
        }
        else{
            var params = '/dataChart/year/'+year+'/format/json';
        }
        

                  CrudOperation.get(params).success(function(data){

                    if(data[1] == undefined || data[1] == null || data[1] == ""){
                        $scope.emptyData = true;
                        $scope.chartConfig.xAxis.categories = "";                    
                        $scope.chartConfig.series[0].name = "";
                        $scope.chartConfig.series[0].data = "";
                        
                    }
                    else{
                        
                        $scope.emptyData = false;
                        $scope.chartConfig.xAxis.categories = data[1].month;                    
                        $scope.chartConfig.series[0].name = data[0].name;                   
                        var m = [];
                               for (var i = 0; i < data[0].data.length; i++) {
                                   
                                   m.push(parseInt(data[0].data[i]));
                               };
                        $scope.chartConfig.series[0].data = m;
                        
                    }
                  
                  $scope.chartConfig.title.text = 'Monthly Sales '+year;
                });
    }

  
   
    window.onresize = function(){
        
        $scope.$evalAsync(function () {
            $scope.$broadcast('highchartsng.reflow');
        });
    }
    
    $scope.chartConfig = {
        options: {
            chart: {
                type: 'area'
               
            }
        },
        series: [{}],
        title: {
            text: ''
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            title: {
                text: 'Overall Amount'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#CF9601'
            }]
        },
        
        size : {            
            width : ''
        },
        func: function (chart) {
            $scope.$evalAsync(function () {
                
                 chart.reflow();
                
           });
        },

        loading: false
    }

  

      }]);

