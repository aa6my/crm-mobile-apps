angular
.module('ConfigModule',[])
.config(['$httpProvider', function($httpProvider, $http) {

		$httpProvider.defaults.useXDomain                         = true;
		$httpProvider.defaults.withCredentials                    = true;
		$httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
		$httpProvider.defaults.headers.common["Accept"]           = "application/json";
		$httpProvider.defaults.headers.common["Content-Type"]     = "application/json";
      
    }
])