// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
                           'ionic', 
                           'starter.controllers',
                           'websiteModule',
                           'customerModule',
                           'vendorModule',
                           'leadModule',
                           'quoteModule',
                           'fileModule',
                           'productModule',
                           'jobModule',
                           'invoiceModule',
                           'loginModule'
                          ])



.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: ''
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    .state('app.main', {
      url: "/main",
      views: {
        'menuContent' :{
          templateUrl: "templates/main.html"
        }
      }
    })

    .state('app.vendors', {
      url: "/vendors",
      views: {
        'menuContent' :{
          templateUrl: "templates/vendors.html"
        }
      }
    })

    .state('app.vendorAdd_Edit', {
      url: "/vendorAdd_Edit",
      views: {
        'menuContent' :{
          templateUrl: "templates/vendorAdd_Edit.html"
        }
      }
    })

    .state('app.leads', {
      url: "/leads",
      views: {
        'menuContent' :{
          templateUrl: "templates/leads.html"
        }
      }
    })

    .state('app.leadAdd_Edit', {
      url: "/leadAdd_Edit",
      views: {
        'menuContent' :{
          templateUrl: "templates/leadAdd_Edit.html"
        }
      }
    }) 

    .state('app.customers', {
      url: "/customers",
      views: {
        'menuContent' :{
          templateUrl: "templates/customers.html"
        }
      }
    })

    .state('app.customerAdd_Edit', {
      url: "/customerAdd_Edit",
      views: {
        'menuContent' :{
          templateUrl: "templates/customerAdd_Edit.html"
        }
      }
    }) 

    .state('app.products', {
      url: "/products",
      views: {
        'menuContent' :{
          templateUrl: "templates/products.html"
        }
      }
    })

    .state('app.productAdd_Edit', {
      url: "/productAdd_Edit",
      views: {
        'menuContent' :{
          templateUrl: "templates/productAdd_Edit.html"
        }
      }
    }) 


    .state('app.quotes', {
      url: "/quotes",
      views: {
        'menuContent' :{
          templateUrl: "templates/quotes.html"
        }
      }
    })

    .state('app.quoteAdd_Edit', {
      url: "/quoteAdd_Edit",
      views: {
        'menuContent' :{
          templateUrl: "templates/quoteAdd_Edit.html"
        }
      }
    }) 

    .state('app.websites', {
      url: "/websites",
      views: {
        'menuContent' :{
          templateUrl: "templates/websites.html"
        }
      }
    })    
    .state('app.websiteAdd_Edit', {
      url: "/websiteAdd_Edit",
      views: {
        'menuContent' :{
          templateUrl: "templates/websiteAdd_Edit.html"
        }
      }
    }) 
    .state('app.jobs', {
      url: "/jobs",
      views: {
        'menuContent' :{
          templateUrl: "templates/jobs.html"
        }
      }
    })    


    .state('app.invoices', {
      url: "/invoices",
      views: {
        'menuContent' :{
          templateUrl: "templates/invoices.html"
        }
      }
    })    

    .state('app.files', {
      url: "/files",
      views: {
        'menuContent' :{
          templateUrl: "templates/files.html"
        }
      }
    })

    .state('app.fileAdd_Edit', {
      url: "/fileAdd_Edit",
      views: {
        'menuContent' :{
          templateUrl: "templates/fileAdd_Edit.html"
        }
      }
    }) 

    .state('app.login', {
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "templates/login.html"
        }
      }
    })         

    .state('app.finance', {
      url: "/finance",
      views: {
        'menuContent' :{
          templateUrl: "templates/finance.html"
        }
      }
    });   


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});

