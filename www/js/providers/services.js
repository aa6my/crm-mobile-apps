angular
.module('ServiceModule', ['ngResource','ionic','ValConstantService'])
/**
 * Default setting for crm-mobile-apps 
 * call this function when needed
 */
.factory('Settings', function(init) {
  return {
      upload  : '',
     // url     : 'https://192.168.0.201/apps',
      url     : '',
      domain_name : '',
      company_name : ''
  };
})

/**
 * Encode and Decode Authentication username and password.
 * call this function when needed
 */
.service('appServices', function appServices($q) {
    // Wrap the barcode scanner in a service so that it can be shared easily.
    this.scanBarcode = function() {
        // The plugin operates asynchronously so a promise
        // must be used to display the results correctly.
        var deferred = $q.defer();
        try {
            cordova.plugins.barcodeScanner.scan(
                function (result) {  // success
                    deferred.resolve({'error':false, 'result': result});
                }, 
                function (error) {  // failure
                    deferred.resolve({'error':true, 'result': error.toString()});
                    //console.log(error.toString());
                }
            );
        }
        catch (exc) {
            deferred.resolve({'error':true, 'result': 'exception: ' + exc.toString()});
            console.log(exc.toString());
        }
        return deferred.promise;
    };
})

.factory('Base64', function () {
    
 
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
 
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };
 
    /* jshint ignore:end */
})

/**
 * Universal function declare here, later controller will 
 * call this function when needed
 * mostly suitable for process that can accessable by all controllers
 */
.factory('UniversalFunction', function($http, Auth, init,$state){

   var func     = {};
   var formData = {};
   var jenis    = {
                     add : false,
                     edit : false,
                     operationType : 'add'
                  };

       func.refreshOnce = function(urlToFetch){        
            return $http.get(urlToFetch, Auth.doAuth(init.username, init.password));         
       }

       /*--- Mostly for EDIT FORM --
       This function used to display data into form field when click edit button, so no need to reselect again from RESTful api, just take the data from list page into edit page
        */
       func.displayFormData = function(myData){
            formData = myData;
            return formData;
       }
       func.returnDisplayFormData = function(){
            return formData;
       }
       /*-- end here --*/


       /*
       This function used to HIDE or SHOW button submit(for add) and save(for edit) since we use the same form/page for save and edit.
        */
       func.buttonOnly = function(addVal, editVal){                
            jenis.add           = addVal;   // value TRUE or FALSE
            jenis.edit          = editVal;  // value TRUE or FALSE               
            return jenis;
       }
       func.returnButtonOnly = function(){
            return jenis;
       }
       /*-- end here --*/


       func.redraw = function(value){
            return function(){
                    $('.footable').trigger('footable_redraw');
                      return value;
                    }
       }

       func.convert_to_date = function(date_input){

          var str_date = date_input.substr(4,11);
            var exp_date = str_date.split(' ');

            var months =  {        'Jan' : 1,
                                   'Feb' : 2,
                                   'Mar' : 3,
                                   'Apr' : 4,
                                   'May' : 5,
                                   'Jun' : 6,
                                   'Jul' : 7,
                                   'Aug' : 8,
                                   'Sep' : 9,
                                   'Oct' : 10,
                                   'Nov' : 11,
                                   'Dec' : 12
                        };
                

          var new_month = new Array();
            if(exp_date[0] in months){
              new_month = months[exp_date[0]];
            }

            return exp_date[1]+'-'+new_month+'-'+exp_date[2];
       }

       func.home_button = function(){

        return $state.go('app.main');

       }

       return func;
})

/**
 * User Authentication using basic Http Authentication 
 * Accept three parameter
 * 3rd parameter is optional, leave blank if don't need
 */
.factory('Auth', function(Base64){ 
   
   var authVal = {};

       authVal.doAuth = function(username, password, method){ 

        var auth = Base64.encode(username + ':' + password);
      
        if(method === undefined || method === "NULL" || method === ""){ 
          method = "GET_n_POST";
        }

         switch(method){

            case 'DELETE' : 

                var config = {headers: {
                      'Authorization': 'Basic '+auth,
                      'Accept': 'application/json;odata=verbose',
                      "X-Testing" : "testing",
                      'X-HTTP-Method-Override' : 'DELETE'
                  }
              };
            return config;
            break;

            case 'GET_n_POST' : 
              var config = {headers: {
                      'Authorization': 'Basic '+auth,
                      'Accept': 'application/json;odata=verbose',
                      "X-Testing" : "testing"
                  }
              };
            return config;
            break;

            case 'PUT' : 
              var config = {headers: {
                      'Authorization': 'Basic '+auth,
                      'Accept': 'application/json;odata=verbose',
                      "X-Testing" : "testing",
                      'X-HTTP-Method-Override' : 'PUT'
                  }
              };
            return config;
            break;
                       
          }
          

              
     }

      return authVal;
})
.factory('jobService', function(){
   
   var jService = {};
   var  dd;

       jService.addData = function(data){
          dd = data;

       }

       jService.displayData = function(){
          return dd;
       }

       return jService;
 })


/**
 * CRUD(Create, Read, Update, Delete) operation..
 * call this function to make crud operation in controller
 */
.factory('CrudOperation', function($http, $ionicPopup,$state, Settings, init, Auth, UniversalFunction){
  
  var operation = {};
  
      /**
       * Delete Operation
       * @param  {[type]} params          [cumpolsary - api request parameter + URL]
       * @param  {[type]} stateToRedirect [optional   - name of the state that need to redirect after doing process, if not pass the paramater, the default value will be add is '$state.current', which mean, redirect to current state, doesn't need to redirect to the other state.]
       * example call method : CrudOperation.delete('http://localhost/nameSite/apps/dataAll/type/vendors/key/vendor_id/val/12','app.vendor')
       */
      operation.delete = function(params, stateToRedirect){
      
          var stateToRedirect = (stateToRedirect === undefined || stateToRedirect === null || stateToRedirect === "") ? $state.current : stateToRedirect;
          var url             = Settings.url + params;          
          var confirmPopup    = $ionicPopup.confirm({
                                                     title: 'Delete Confirmation',
                                                     template: 'Are you sure you want to delete this data?'
                                                   });
            
                 confirmPopup.then(function(res)
                 {
                  if(res) 
                    {
                      $http.get(url, Auth.doAuth(init.username, init.password, 'DELETE'))
                           .success(function(data) {                              
                               $state.go(stateToRedirect, {}, {reload: true});
                           })
                           .error(function(data, status, headers, config){ /* Error handling here */ })           
                     } 
                     else 
                     {console.log('You are not sure dihhh');}
                });
      }


      /**
       * ADD operation
       * @param {[type]} params [cumpolsary : request api URL only without paramater]
       * @param {[type]} data   [cumpolsary : form data from view form]
       * @param {[type]} stateToRedirect   [optional : redirect to state function]
       */
      operation.add = function(params, data, stateToRedirect, reload){
        
          var url             = Settings.url + params;
          var reload          = (reload === undefined || reload === null || reload === "") ? false : true;
          var stateToRedirect = (stateToRedirect === undefined || stateToRedirect === null || stateToRedirect === "") ? $state.current : stateToRedirect;

                  $http.post(url,data, Auth.doAuth(init.username, init.password))
                  .success(function(data) {            
                    $state.go(stateToRedirect, {}, {reload: reload});//reload : false(default boolean) - set to true if want to reload controller/view/page after submit data

                  })
                  .error(function(data, status, headers, config){
                    console.log(config);            
                  }) 
      }

      operation.add_no_redirect = function(params, data){
        
          var url             = Settings.url + params;
          //var reload          = (reload === undefined || reload === null || reload === "") ? false : true;
          //var stateToRedirect = (stateToRedirect === undefined || stateToRedirect === null || stateToRedirect === "") ? $state.current : stateToRedirect;

          var f = $http.post(url,data, Auth.doAuth(init.username, init.password));
              return f.success(function(response) {            
                    var data = response.data,
                                status = response.status,
                                header = response.header,
                                config = response.config;
                                return status;

                  })
                  .error(function(data, status, headers, config){
                    console.log(config);            
                  }) 
      }



      operation.update = function(params, data, stateToRedirect, reload){
        
          var url = Settings.url + params;
          var reload          = (reload === undefined || reload === null || reload === "") ? false : true;
          var stateToRedirect = (stateToRedirect === undefined || stateToRedirect === null || stateToRedirect === "") ? $state.current : stateToRedirect;

                  $http.post(url,data, Auth.doAuth(init.username, init.password, 'PUT')) /* <----- different here with add method -- */
                  .success(function(data) {
                    
                    $state.go(stateToRedirect, {}, {reload: reload});//reload : false(default boolean) - set to true if want to reload controller/view/page after submit data

                  })
                  .error(function(data, status, headers, config){
                    console.log(config);
                    
                  }) 
      }

      operation.update_no_redirect = function(params, data){
        
          var url = Settings.url + params;          
          var j   = $http.post(url,data, Auth.doAuth(init.username, init.password, 'PUT')); 
              return j.success(function(response) {
                   var data = response.data,
                                status = response.status,
                                header = response.header,
                                config = response.config;
                                return status;

                  })
                  .error(function(data, status, headers, config){
                    console.log(config);
                    
                  }) 
      }


      operation.get = function(params){
        
          var url = Settings.url + params;
          var kk = [];
          

                var a =    $http.get(url, Auth.doAuth(init.username, init.password));
                return a.success( function(response) {
                            var data = response.data,
                                status = response.status,
                                header = response.header,
                                config = response.config;
                                return data;

                        }, function(response) {
                            var data = response.data,
                                status = response.status,
                                header = response.header,
                                config = response.config;
                            
                        } );
                
      }


      return operation;
})