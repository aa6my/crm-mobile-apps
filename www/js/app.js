// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])



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
      controller: 'AppCtrl'
    })

    // .state('app.search', {
    //   url: "/search",
    //   views: {
    //     'menuContent' :{
    //       templateUrl: "templates/search.html"
    //     }
    //   }
    // })

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

    .state('app.leads', {
      url: "/leads",
      views: {
        'menuContent' :{
          templateUrl: "templates/leads.html"
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

    .state('app.products', {
      url: "/products",
      views: {
        'menuContent' :{
          templateUrl: "templates/products.html"
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

    .state('app.websites', {
      url: "/websites",
      views: {
        'menuContent' :{
          templateUrl: "templates/websites.html"
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

    .state('app.finance', {
      url: "/finance",
      views: {
        'menuContent' :{
          templateUrl: "templates/finance.html"
        }
      }
    });   

    // .state('app.playlists', {
    //   url: "/playlists",
    //   views: {
    //     'menuContent' :{
    //       templateUrl: "templates/playlists.html",
    //       controller: 'PlaylistsCtrl'
    //     }
    //   }
    // })

    // .state('app.single', {
    //   url: "/playlists/:playlistId",
    //   views: {
    //     'menuContent' :{
    //       templateUrl: "templates/playlist.html",
    //       controller: 'PlaylistCtrl'
    //     }
    //   }
    // });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
});

