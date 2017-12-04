// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services' ,'directives', 'ionMDRipple'])

.run(function($ionicPlatform, $rootScope) {



  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
 window.open = cordova.InAppBrowser.open;
          $ionicPlatform.registerBackButtonAction(function (event) {
            event.preventDefault();
        }, 100);

          
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });


})

 .constant("serverConfig", {
       // "url": "http://viaprod.tribu.com.py:80",
       "url": "app.viapd.org:8080",
       
        //"port": "80"
    })



.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider, $httpProvider) {

   $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
  

    $ionicConfigProvider.backButton.text("Volver");
     $ionicConfigProvider.backButton.icon('my-back-button');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'homeCtrl'
    })



    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: "HomeController"
    })

        .state('internaMaestria', {
      url: '/internaMaestria/:idMaestria',
      templateUrl: 'templates/internaMaestria.html',
      controller: "internaMaestriaCtrl"
    })


        .state('cuenta', {
      url: '/cuenta',
      templateUrl: 'templates/cuenta.html',
      controller: "cuentaCtrl"
    })

                .state('mapa', {
      url: '/mapa',
      templateUrl: 'templates/mapa.html',
      controller: "mapaCtrl"
    })



                .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: "loginCtrl"
    })


                .state('generarPIN', {
      url: '/generarPIN',
      templateUrl: 'templates/generarPIN.html',
      controller: "generarPINCtrl"
    })



        .state('notificaciones', {
      url: '/notificaciones',
      templateUrl: 'templates/notificaciones.html',
      controller: "notificacionesCtrl"
    })



                .state('internaModuloMaestria', {
                  cache:false,
      url: '/internaModuloMaestria/:idMaestria/:idDiplomado',
      templateUrl: 'templates/internaModuloMaestria.html',
      controller: "internaModuloMaestriaCtrl"
    })

        .state('internaModuloDiplomado', {
          cache:false,
      url: '/internaModuloDiplomado/:idDiplomado',
      templateUrl: 'templates/internaModuloDiplomado.html',
      controller: "internaModuloDiplomadoCtrl"
    })


                .state('notaMaestria', {
                  cache:false,
      url: '/notaMaestria/:idDiplomado/:idMaestria/:idModulo',
      templateUrl: 'templates/notaMaestria.html',
      controller: "notaMaestriaCtrl"
    })

                .state('encuesta', {
                  cache:false,
      url: '/encuesta/:idModulo/:idDiplomado',
      templateUrl: 'templates/encuesta.html',
      controller: "encuestaCtrl"
    })


     .state('notaTesis', {
      cache:false,
      url: '/notaTesis/:idMaestria',
      templateUrl: 'templates/notaTesis.html',
      controller: "notaTesisCtrl"
    })


                .state('notaDiplomado', {
                  cache:false,
      url: '/notaDiplomado/:idModulo/:idDiplomado',
      templateUrl: 'templates/notaDiplomado.html',
      controller: "notaDiplomadoCtrl"
    })

    .state('tasks', {
      cache : false,
      url: '/tasks',
      templateUrl: 'templates/tasks.html',
      controller: "HomeController"
    })
    .state('new', {
      url: '/new',
      templateUrl: 'templates/new.html',
      controller: "HomeController"
    })
    .state('edit', {
      url: '/task/:id',
      templateUrl: 'templates/edit.html',
      controller: "HomeController"
    })



  // if none of the above states are matched, use this as the fallback


          if(localStorage.getItem('userInfoVIA') == null || 
            localStorage.getItem('userInfoVIA') == 'null' || 
            localStorage.getItem('userInfoVIA') == 'undefined' || 
            localStorage.getItem('userInfoVIA') == undefined){

        //console.log(localStorage.getItem('userInfoTS'));
      $urlRouterProvider.otherwise('/login');

        }
        else{
           // console.log(localStorage.getItem('userInfoTS'));
        $urlRouterProvider.otherwise('/');
        // $urlRouterProvider.otherwise("/login");
        }




});
