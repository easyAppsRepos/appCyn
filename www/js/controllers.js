angular.module('starter.controllers', [])


.controller('HomeController', ["$ionicLoading", "$rootScope", "$state", function(  $ionicLoading, $rootScope, $state) {
  


    }])



.controller('internaMaestriaCtrl', ["$ionicLoading", "$rootScope", "$state", function(  $ionicLoading, $rootScope, $state) {
  


    }])

.controller('internaModuloMaestriaCtrl', function(  $scope, $ionicLoading, $rootScope, $state,$ionicSlideBoxDelegate) {
  
  console.log('dd');

    $scope.nextSlide = function() {
      console.log('d');
    $ionicSlideBoxDelegate.next();
  }

      $scope.prevSlide = function() {
      console.log('d');
    $ionicSlideBoxDelegate.previous();
  }


    })

.controller('cuentaCtrl', function(  $scope, $ionicLoading, $rootScope, $state,$ionicSlideBoxDelegate) {
  
  console.log('dd');




    })

.controller('homeCtrl', function(  $scope, $ionicLoading, $rootScope, $state,$ionicSlideBoxDelegate) {
  
  console.log('dd');




    })

.controller('loginCtrl', function(  $scope, $ionicLoading, $rootScope, $state,$ionicSlideBoxDelegate) {
  
  console.log('dd');




    })



.controller('notificacionesCtrl', function(  $scope, $ionicLoading, $rootScope, $state,$ionicSlideBoxDelegate) {
  
  console.log('dd');




    })




.controller('mainMenuCtrl', function(  $scope, $ionicLoading, $rootScope, $state,$ionicSlideBoxDelegate, $ionicModal) {
  
  console.log('dd');

    $scope.nextSlide = function() {
      console.log('d');
    $ionicSlideBoxDelegate.next();
  }

      $scope.prevSlide = function() {
      console.log('d');
    $ionicSlideBoxDelegate.previous();
  }


  $scope.noEncuesta = function(){
$scope.closeModal();
       $state.go('encuesta');

  }

    $scope.goCuenta = function(){
$scope.closeModal();
     $state.go('cuenta');

  }

      $scope.goNotificaciones = function(){
$scope.closeModal();
     $state.go('notificaciones');

  }


     $scope.problemasAdministrativos = function(){
$scope.closeModal();
     $scope.openModal('inconvenientes.html', 'slide-in-down');

  }



      $scope.goHome = function(){
$scope.closeModal();
     $state.go('home');

  }



    $scope.retiraCertificado = function(){
$scope.closeModal();
      $scope.openModal('retiraCertificado.html', 'slide-in-down');

  }

  


      $scope.contacto = function(){
$scope.closeModal();
      $scope.openModal('contacto.html', 'slide-in-down');

  }



  $scope.modalClasses = ['slide-in-up', 'slide-in-down', 'fade-in-scale', 'fade-in-right', 'fade-in-left', 'newspaper', 'jelly', 'road-runner', 'splat', 'spin', 'swoosh', 'fold-unfold'];

  $scope.openModal = function(templateName,animation) {
    $ionicModal.fromTemplateUrl(templateName, {
      scope: $scope,
      animation: animation
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });





    })



.controller('internaModuloDiplomadoCtrl', function(  $scope, $ionicLoading, $rootScope, $state,$ionicSlideBoxDelegate) {
  
  console.log('dd');

    $scope.nextSlide = function() {
      console.log('d');
    $ionicSlideBoxDelegate.next();
  }

      $scope.prevSlide = function() {
      console.log('d');
    $ionicSlideBoxDelegate.previous();
  }


    })


.controller('notaMaestriaCtrl', function(  $scope, $ionicLoading, $rootScope, $state,$ionicSlideBoxDelegate) {
  
  console.log('dd');

    $scope.nextSlide = function() {
      console.log('d');
    $ionicSlideBoxDelegate.next();
  }

      $scope.prevSlide = function() {
      console.log('d');
    $ionicSlideBoxDelegate.previous();
  }


    })


.controller('notaTesisCtrl', function(  $scope, $ionicLoading, $rootScope, $state,$ionicSlideBoxDelegate) {
  
  console.log('dd');

    $scope.nextSlide = function() {
      console.log('d');
    $ionicSlideBoxDelegate.next();
  }

      $scope.prevSlide = function() {
      console.log('d');
    $ionicSlideBoxDelegate.previous();
  }


    })


.controller('encuestaCtrl', function(  $scope, $ionicLoading, $rootScope, $state,$ionicSlideBoxDelegate) {
  
  console.log('dd');

    $scope.nextSlide = function() {
      console.log('d');
    $ionicSlideBoxDelegate.next();
  }

      $scope.prevSlide = function() {
      console.log('d');
    $ionicSlideBoxDelegate.previous();
  }


    })





.controller('notaDiplomadoCtrl', function(  $scope, $ionicLoading, $rootScope, $state,$ionicSlideBoxDelegate) {
  
  console.log('dd');

    $scope.nextSlide = function() {
      console.log('d');
    $ionicSlideBoxDelegate.next();
  }

      $scope.prevSlide = function() {
      console.log('d');
    $ionicSlideBoxDelegate.previous();
  }


    })

