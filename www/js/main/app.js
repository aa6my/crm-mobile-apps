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
                           'loginModule',
                           'serverModule',
                           'mainModule',
                           'financeModule',
                           'signoutModule'
                          ])



.run(function($ionicPlatform,$state) {
  $ionicPlatform.registerBackButtonAction(function (event) {
            if ($state.is('app.server')) {
                alert("Exiting the app. Goodbye!");
                navigator.app.exitApp();
            } else if ($state.is('app.main')){
               console.log("aa");
            } else{
              navigator.app.backHistory();
            }
        }, 101);
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (typeof analytics !== 'undefined'){
      analytics.startTrackerWithId('UA-58939571-2');
      analytics.trackException('Error', true);
    }
    else
    {
      alert("Google Analytics plugin could not be loaded.");
    }
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

    .state('app.server', {
      url: "/server",
      views: {
        'menuContent' :{
          templateUrl: "templates/server.html"
        }
      }
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
    .state('app.quote_items', {
      url: "/quote_items/:quote_id",
      views: {
        'menuContent' :{
          templateUrl: "templates/quote_items.html"
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
    .state('app.jobs_main', {
      url: "/jobs_main",
      views: {
        'menuContent' :{
          templateUrl: "templates/jobs_main.html"
        }
      }
    })
    .state('app.jobs_task', {
      url: "/jobs_task/:job_id/:job_hour",
      views: {
        'menuContent' :{
          templateUrl: "templates/jobs_task.html"
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

    .state('app.invoiceAdd_Edit', {
      url: "/invoiceAdd_Edit",
      views: {
        'menuContent' :{
          templateUrl: "templates/invoiceAdd_Edit.html"
        }
      }
    })

    .state('app.invoice_items', {
      url: "/invoice_items/:invoice_id/:invoice_status",
      views: {
        'menuContent' :{
          templateUrl: "templates/invoice_items.html"
        }
      }
    }) 
    .state('app.invoice_payments', {
      url: "/invoice_payments/:invoice_id/:invoice_status",
      views: {
        'menuContent' :{
          templateUrl: "templates/invoice_payments.html"
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
     //url: "/login/:server_name{crm:(?:/[^/]+)?}",
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

/**
 * use this in production
 *
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/dist/menu.html",
      controller: ''
    })

    .state('app.server', {
      url: "/server",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/server.html"
        }
      }
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/search.html"
        }
      }
    })

    .state('app.main', {
      url: "/main",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/main.html"
        }
      }
    })

    .state('app.vendors', {
      url: "/vendors",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/vendors.html"
        }
      }
    })

    .state('app.vendorAdd_Edit', {
      url: "/vendorAdd_Edit",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/vendorAdd_Edit.html"
        }
      }
    })

    .state('app.leads', {
      url: "/leads",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/leads.html"
        }
      }
    })

    .state('app.leadAdd_Edit', {
      url: "/leadAdd_Edit",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/leadAdd_Edit.html"
        }
      }
    }) 

    .state('app.customers', {
      url: "/customers",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/customers.html"
        }
      }
    })

    .state('app.customerAdd_Edit', {
      url: "/customerAdd_Edit",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/customerAdd_Edit.html"
        }
      }
    }) 

    .state('app.products', {
      url: "/products",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/products.html"
        }
      }
    })

    .state('app.productAdd_Edit', {
      url: "/productAdd_Edit",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/productAdd_Edit.html"
        }
      }
    }) 


    .state('app.quotes', {
      url: "/quotes",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/quotes.html"
        }
      }
    })

    .state('app.quoteAdd_Edit', {
      url: "/quoteAdd_Edit",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/quoteAdd_Edit.html"
        }
      }
    }) 
    .state('app.quote_items', {
      url: "/quote_items/:quote_id",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/quote_items.html"
        }
      }
    })

    .state('app.websites', {
      url: "/websites",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/websites.html"
        }
      }
    })    
    .state('app.websiteAdd_Edit', {
      url: "/websiteAdd_Edit",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/websiteAdd_Edit.html"
        }
      }
    }) 
    .state('app.jobs', {
      url: "/jobs",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/jobs.html"
        }
      }
    })
    .state('app.jobs_main', {
      url: "/jobs_main",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/jobs_main.html"
        }
      }
    })
    .state('app.jobs_task', {
      url: "/jobs_task/:job_id/:job_hour",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/jobs_task.html"
        }
      }
    })
    
    .state('app.invoices', {
      url: "/invoices",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/invoices.html"
        }
      }
    })

    .state('app.invoiceAdd_Edit', {
      url: "/invoiceAdd_Edit",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/invoiceAdd_Edit.html"
        }
      }
    })

    .state('app.invoice_items', {
      url: "/invoice_items/:invoice_id/:invoice_status",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/invoice_items.html"
        }
      }
    }) 
    .state('app.invoice_payments', {
      url: "/invoice_payments/:invoice_id/:invoice_status",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/invoice_payments.html"
        }
      }
    })     

    .state('app.files', {
      url: "/files",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/files.html"
        }
      }
    })

    .state('app.fileAdd_Edit', {
      url: "/fileAdd_Edit",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/fileAdd_Edit.html"
        }
      }
    }) 

    .state('app.login', {
      url: "/login/:server_name",
     //url: "/login/:server_name{crm:(?:/[^/]+)?}",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/login.html"
        }
      }
    })        

    .state('app.finance', {
      url: "/finance",
      views: {
        'menuContent' :{
          templateUrl: "templates/dist/finance.html"
        }
      }
    });   */



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/server');
});

