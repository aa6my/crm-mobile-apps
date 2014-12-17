angular
.module('ServiceModule', ['ngResource'])
/**
 * Default setting for crm-mobile-apps 
 * call this function when needed
 */
.factory('Settings', function() {
  return {
      upload : 'https://localhost/customer-relationship-management/assets/uploads/files/',
      url : 'https://localhost/customer-relationship-management/apps'
  };
})

/**
 * Encode and Decode Authentication username and password.
 * call this function when needed
 */
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
 */
.factory('UniversalFunction', function($http, Auth, init){

   var func = {};

       func.refreshOnce = function(urlToFetch){
        
         return $http.get(urlToFetch, Auth.doAuth(init.username, init.password));
         
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
          method = "GET";
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
            

            case 'GET' : 
              var config = {headers: {
                      'Authorization': 'Basic '+auth,
                      'Accept': 'application/json;odata=verbose',
                      "X-Testing" : "testing"
                  }
              };
            return config;
            break;
            
          }
          

              
     }

      return authVal;
})


/**
 * CRUD(Create, Read, Update, Delete) operation..
 * call this function to make crud operation in controller
 */
.factory('CrudOperation', function($http, Settings, init, Auth){
  
  var operation = {};

      operation.delete = function(params){
        var url = Settings.url + params;

        $http.get(url, Auth.doAuth(init.username, init.password, 'DELETE'))
        .success(function(data) {
          console.log(data);

        })
        .error(function(data, status, headers, config){
          console.log(config);
          
        }) 

        
      }

      return operation;
})