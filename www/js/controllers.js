angular.module('starter.controllers', [])


.controller('HomeController', ["$ionicLoading", "$rootScope", "$state", function(  $ionicLoading, $rootScope, $state) {
  


    }])


.controller('getNotiCtrl', function(  $scope, $ionicLoading, $stateParams, $rootScope, $state,$ionicSlideBoxDelegate, api) {
           
           var userData = JSON.parse(window.localStorage.getItem('userInfoVIA'));
  $scope.nombreAlumno=  userData.nombre;

          api.getNotificacionesCount(userData.idAlumno).then(function(data) {

        //$ionicLoading.hide();
       // console.log(data);

        if(data==null){
          //mensajeAlerta('Ha ocurrido un error, verifique su conexion a internet'); return false;
             console.log('ha ocurrido un error' );
        }

        if(data.error){
          console.log('ha ocurrido un error' );
        }
        else{
$scope.not = data.num;
//console.log(data);
        }
        

      });


  })
.controller('internaMaestriaCtrl', function(  $scope, $ionicLoading, $stateParams, $rootScope, $state,$ionicSlideBoxDelegate, api) {
  
  $ionicLoading.show();
  $scope.detalleIM={};

$scope.goBack = function(){


}


  var userData = JSON.parse(window.localStorage.getItem('userInfoVIA'));
  $scope.nombreAlumno=  userData.nombre;
  $scope.idMaestria = $stateParams.idMaestria;
  
  $scope.getPorc=function(e){

var r = Math.round(e);
return r;
  }
console.log(userData.idAlumno);
        api.getDiplomadosMaestria($scope.idMaestria,userData.idAlumno).then(function(data) {

        $ionicLoading.hide();
        console.log(data);

        if(data==null){
          //mensajeAlerta('Ha ocurrido un error, verifique su conexion a internet'); return false;
             console.log('ha ocurrido un error' );
        }

        if(data.error){
          console.log('ha ocurrido un error' );
        }
        else{
          $scope.diplomados = data.diplomados;
          $scope.nombreMaestria = data.nombreMaestria;
          $scope.tesis = data.tesis;
          $scope.dataTesis=data.dataTesis; 
        
        }
        

      });
        $scope.getTesisEstado = function(){

          if($scope.tesis){ 
            return $scope.dataTesis.avance+'%' 
          }
          else{ 
          return "-"
           }  
        }

        $scope.goTesis = function(){

        if($scope.tesis){ 
          $state.go('notaTesis'); 
        }
        else{ 
          
        }  
        }


    })

.controller('internaModuloMaestriaCtrl', function(  $scope, $rootScope, $ionicLoading, api, $stateParams, $rootScope, $state,$ionicSlideBoxDelegate) {
  
  //console.log('dd');

//$scope.test= {test:[{a:'b', c:'d'},{a:'b', c:'d'}]};
      $scope.$on('cambiarDiplomado', function(event, args) {

          console.log(args.opcion);
          $scope.idDiplomado = args.opcion;
          actualizarVista();
      });


    $scope.nextSlide = function() {
      console.log('d');
    $ionicSlideBoxDelegate.next();
  }

      $scope.prevSlide = function() {
      console.log('d');
    $ionicSlideBoxDelegate.previous();
  }

  var userData = JSON.parse(window.localStorage.getItem('userInfoVIA'));
  $scope.nombreAlumno=  userData.nombre;
  $scope.idMaestria = $stateParams.idMaestria;
  $scope.idDiplomado = $stateParams.idDiplomado;



        function actualizarVista(){
            $ionicLoading.show();
            api.getModulosDiplomado($scope.idDiplomado,userData.idAlumno, $scope.idMaestria).then(function(data) {
           
            console.log(data);
            $scope.nombreMaestria=data.nombreMaestria;
            if(data==null){
            //mensajeAlerta('Ha ocurrido un error, verifique su conexion a internet'); return false;
            console.log('ha ocurrido un error' );
            return false;
            }
            if(data.error){
            console.log('ha ocurrido un error' );
             $ionicLoading.hide();
            }
            else{
            $scope.modulos = data.modulos; 
             $ionicLoading.hide();
            }
            });
        }
       // getDiplomados();
       // actualizarVista();

       $scope.verificarEncuesta = function(idModulo){

        console.log('d');
        
                    $ionicLoading.show();
            api.verificarEncuesta(userData.idAlumno).then(function(data) {
           
            console.log(data.encuestasPendientes);
            //$scope.nombreMaestria=data.nombreMaestria;
            if(data==null){
            //mensajeAlerta('Ha ocurrido un error, verifique su conexion a internet'); return false;
            console.log('ha ocurrido un error' );
            return false;
            }
            if(data.error){
            console.log('ha ocurrido un error' );
             $ionicLoading.hide();
            }
            else{
            //$scope.modulos = data.modulos; 
             $ionicLoading.hide();
             if(data.encuestasPendientes.length>0){
              console.log('encuesta pendiente');
              console.log(data.encuestasPendientes[0].idDiplomado);
              console.log(data.encuestasPendientes[0].idModulo);

              $state.go('encuesta', { idModulo: data.encuestasPendientes[0].idModulo, idDiplomado: data.encuestasPendientes[0].idDiplomado })

             }
             else{ 
              $state.go('notaMaestria',{idDiplomado:$scope.idDiplomado, idMaestria: $scope.idMaestria, idModulo:idModulo });
            } 

            }
            });

       }


    })

.controller('cuentaCtrl', function(  $scope, api, $ionicLoading, $rootScope, $state,$ionicSlideBoxDelegate) {
  


        $scope.$on('$ionicView.enter', function(){ //This is fired twice in a row
      var userData = JSON.parse(window.localStorage.getItem('userInfoVIA'));
  $scope.nombreAlumno=  userData.nombre;
    $scope.emailAlumno=  userData.email;
      $scope.telefono=  parseInt(userData.telefono);
        $scope.notis=  userData.noti;
        console.log(userData);
        $scope.numTelPrincipal = window.localStorage.getItem('infoTel1VIA');
    });

$scope.editando = false;

     // window.localStorage.setItem( 'userInfoVIA', JSON.stringify(data));

      var userData = JSON.parse(window.localStorage.getItem('userInfoVIA'));
  $scope.nombreAlumno=  userData.nombre;
    $scope.emailAlumno=  userData.email;
      $scope.telefono=  parseInt(userData.telefono);
        $scope.notis=  userData.noti;
        $scope.not=  userData.nots == 1 ? true: false;

console.log(userData);

  //$scope.idDiplomado = $stateParams.idDiplomado;
  $scope.idUsuario = userData.idAlumno;


 
  $scope.actu = function(d){
 console.log(d);
var val = d == true ? 1 : 0;
console.log(val);
console.log(userData.idAlumno);


       api.editarNoti(userData.idAlumno, val).then(function(data) {
     
      console.log(data);
     
      if(data==null){
      //mensajeAlerta('Ha ocurrido un error, verifique su conexion a internet'); return false;
      console.log('ha ocurrido un error' );
       $ionicLoading.hide();
      return false;
      }
      if(data.error){
      console.log('ha ocurrido un error' );
       $ionicLoading.hide();
      }
      else{

        //userData.not = d == true ? 1 : 0;
        window.localStorage.setItem( 'userInfoVIA', JSON.stringify(userData));
       $ionicLoading.hide();

      }
      });



  }

  $scope.editarTelefono = function(){
 console.log('dd');
$scope.editando = true;
  }


  $scope.guardarEdicion = function(e){
 console.log(e);


      $ionicLoading.show();
      api.editarTelefono(userData.idAlumno, e).then(function(data) {
     
      console.log(data);
     
      if(data==null){
      //mensajeAlerta('Ha ocurrido un error, verifique su conexion a internet'); return false;
      console.log('ha ocurrido un error' );
       $ionicLoading.hide();
      return false;
      }
      if(data.error){
      console.log('ha ocurrido un error' );
       $ionicLoading.hide();
      }
      else{

        userData.telefono = e;
        window.localStorage.setItem( 'userInfoVIA', JSON.stringify(userData));

        $scope.editando = false;
        
       $ionicLoading.hide();
      }
      });

  }



    })



.controller('mapaCtrl', function(  $scope, $ionicLoading, $ionicModal, $rootScope, $state,$ionicSlideBoxDelegate, api) {


})
.controller('homeCtrl', function(  $scope, $ionicLoading, $ionicModal, $rootScope, $state,$ionicSlideBoxDelegate, api) {
  

      $scope.$on('$ionicView.enter', function(){ //This is fired twice in a row

  var userData = JSON.parse(window.localStorage.getItem('userInfoVIA'));
  $scope.userData=  JSON.parse(window.localStorage.getItem('userInfoVIA'));
    $scope.nombreAlumno=  userData.nombre;

    $scope.getHomeData();

    });


    $scope.maestria={};
     $scope.diplomado={};
     $scope.modulo={};
     $scope.tesis={};
    //console.log(userData);



    $scope.getHomeData = function(){

      var numDocumento = $scope.userData.idAlumno;
      $ionicLoading.show();
      console.log(numDocumento);
      api.getHomeData(numDocumento).then(function(data) {

        $ionicLoading.hide();

        if(!data.maestria){
           $scope.existeTesis=false;
          $scope.ExisteMaestria=false;


            if(data.modulo){
                $scope.existeModulo=true;
                $scope.modulo.nombre=data.nombreModulo;
                $scope.modulo.id=data.idModulo;
                $scope.modulo.estado = data.estadoModulo;
              }
              else{
                 $scope.existeModulo=false;
              }


          if(data.diplomado){

              $scope.ExisteDiplomado=true;
              $scope.diplomado.nombre=data.nombreDiplomado;
              $scope.diplomado.id=data.idDiplomado;
              $scope.diplomado.porcentaje = data.porcentajeDiplomado;


          if($scope.diplomado.porcentaje==100){
             $scope.openModal('retiraCertificado.html', 'slide-in-down');
            //mostrarFel
          }




          }
          else{
               $scope.ExisteDiplomado=false;

          }  

        }
        else{

          if(data.tesis){
             $scope.existeTesis=true;
             $scope.tesis.id=data.idTesis;
             $scope.tesis.avance=data.avanceTesis;
             $scope.tesis.estado=data.estadoTesis == 1 ? 'Cursando' : 'Pendiente' ;

          }
          else{ $scope.existeTesis=false;}


          $scope.ExisteMaestria=true;
          $scope.maestria.nombre=data.nombreMaestria;
          $scope.maestria.id=data.idMaestria;
          $scope.maestria.porcentaje = data.porcentajeMaestria;

          if($scope.maestria.porcentaje==50){
             $scope.openModal('retiraCertificado.html', 'slide-in-down');
            //mostrarFel
          }

          $scope.ExisteDiplomado=true;
          $scope.diplomado.nombre=data.nombreDiplomado;
          $scope.diplomado.id=data.idDiplomado;
          $scope.diplomado.porcentaje = data.porcentajeDiplomado;

        if($scope.diplomado.porcentaje==100){
             $scope.openModal('retiraCertificado.html', 'slide-in-down');
            //mostrarFel
          }


            if(data.modulo){
                $scope.existeModulo=true;
                $scope.modulo.nombre=data.nombreModulo;
                $scope.modulo.id=data.idModulo;
                $scope.modulo.estado = data.estadoModulo;
              }
              else{
                 $scope.existeModulo=false;
              }



        }  
        console.log(data);
      });
    }

 

    $scope.verMasDiplomado = function(){
console.log($scope.ExisteMaestria);

if($scope.ExisteMaestria){ $state.go('internaModuloMaestria',{idMaestria: $scope.maestria.id, idDiplomado:$scope.diplomado.id});}
else{ $state.go('internaModuloDiplomado',{idDiplomado:$scope.diplomado.id}) }

    }

       $scope.verificarEncuesta = function(idModulo){

        console.log('d');
        
                    $ionicLoading.show();
            api.verificarEncuesta($scope.userData.idAlumno).then(function(data) {
           
            console.log(data.encuestasPendientes);
            //$scope.nombreMaestria=data.nombreMaestria;
            if(data==null){
            //mensajeAlerta('Ha ocurrido un error, verifique su conexion a internet'); return false;
            console.log('ha ocurrido un error' );
            return false;
            }
            if(data.error){
            console.log('ha ocurrido un error' );
             $ionicLoading.hide();
            }
            else{
            //$scope.modulos = data.modulos; 
             $ionicLoading.hide();
             if(data.encuestasPendientes.length>0){
              console.log('encuesta pendiente');
              console.log(data.encuestasPendientes[0].idDiplomado);
              console.log(data.encuestasPendientes[0].idModulo);

              $state.go('encuesta', { idModulo: data.encuestasPendientes[0].idModulo, idDiplomado: data.encuestasPendientes[0].idDiplomado })

             }
             else{ 

              if($scope.ExisteMaestria){ $state.go('internaModuloMaestria',{idMaestria:$scope.maestria.id, idDiplomado:$scope.diplomado.id })}
                else{$state.go('internaModuloDiplomado',{idDiplomado:$scope.diplomado.id })}

            //  $state.go('notaMaestria',{idDiplomado:$scope.idDiplomado, idMaestria: $scope.idMaestria, idModulo:idModulo });
            } 

            }


            });

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

.controller('loginCtrl', function(  $scope, $ionicLoading, $rootScope, $ionicPopup, $state,$ionicSlideBoxDelegate, api) {
  

  $scope.user={};
  function mensajeAlerta(mensaje, borrar){

        
   var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/excla.png"> <p style="margin-top:25px">'+mensaje+'</p> </div>';

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'Cerrar',
          type: 'button-blueCustom',
          onTap: function(e) {

            if(borrar){ $scope.user.pin='';}
           
          }
        }]
      });

}


  $scope.login = function(){

    if($scope.user.numDocumento == null || $scope.user.numDocumento == 'undefined' || $scope.user.numDocumento == undefined ||
      $scope.user.pin == null || $scope.user.pin == 'undefined' || $scope.user.pin == undefined){


mensajeAlerta('Credenciales incompletas',false);


    }
  else{
      $ionicLoading.show();

      api.loginAlumno($scope.user.numDocumento, $scope.user.pin).then(function(data) {
        $ionicLoading.hide();
        console.log(data);

        if(data==null){mensajeAlerta('Ha ocurrido un error, verifique su conexion a internet'); return false;}

        if(data.error){
          mensajeAlerta('Numero de documento o PIN incorrecto',true);
        }
        else{

          //console.log(data);

          if(data.noti>0){ 
            window.localStorage.setItem( 'userInfoVIA', JSON.stringify(data));
            $state.go('notificaciones');       

          }
          else{
            window.localStorage.setItem( 'userInfoVIA', JSON.stringify(data));
            $state.go('home');

          }  
          console.log('login OK!!');
          
        }
        

      });
  
  }

  }




    })

.controller('generarPINCtrl', function(  $scope, $ionicLoading, $rootScope, $ionicPopup, $state,$ionicSlideBoxDelegate, api) {
  
  $scope.user={};

function mensajeAlerta(mensaje, borrar){

        
   var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/excla.png"> <p style="margin-top:25px">'+mensaje+'</p> </div>';

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'Cerrar',
          type: 'button-blueCustom',
          onTap: function(e) {

            if(borrar){ $scope.user={};}
           
          }
        }]
      });

}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

  $scope.generarCodigo = function(){
//{numDocumento: 222, email: "dasda"}
    if($scope.user.numDocumento == null || $scope.user.numDocumento == 'undefined' || $scope.user.numDocumento == undefined ||
      $scope.user.email == null || $scope.user.email == 'undefined' || $scope.user.email == undefined){


mensajeAlerta('Datos incompletos',false);


    }
  else{
      $ionicLoading.show();
      console.log($scope.user);
      api.generarPIN($scope.user.numDocumento, $scope.user.email).then(function(data) {
        $ionicLoading.hide();
        console.log(data);

        if(data){
          mensajeAlerta('Numero de documento o email incorrecto',false);
        }
        else{

          mensajeAlerta('En breve te enviaremos el PIN de acceso a tu cuenta de email. <strong> Por favor revisar "No deseados"</strong>', true);
        }
        

      });
  
  }

  }


  console.log('dd');




    })




.controller('notificacionesCtrl', function(  $scope, api, $ionicLoading, $rootScope, $state,$ionicSlideBoxDelegate) {
  
  console.log('dd');


        $scope.$on('$ionicView.enter', function(){ //This is fired twice in a row

      var userData = JSON.parse(window.localStorage.getItem('userInfoVIA'));
  $scope.nombreAlumno=  userData.nombre;

    });




      var userData = JSON.parse(window.localStorage.getItem('userInfoVIA'));
  $scope.nombreAlumno=  userData.nombre;


  //$scope.idDiplomado = $stateParams.idDiplomado;
  $scope.idUsuario = userData.idAlumno;
    function getNotis(){
            $ionicLoading.show();
            api.getNotificaciones($scope.idUsuario).then(function(data) {
           
            console.log(data);
            //$scope.nombreMaestria=data.nombreMaestria;
            if(data==null){
            //mensajeAlerta('Ha ocurrido un error, verifique su conexion a internet'); return false;
            console.log('ha ocurrido un error' );
            return false;
            }
            if(data.error){
            console.log('ha ocurrido un error' );
             $ionicLoading.hide();
            }
            else{
             $scope.notificaciones = data.notificaciones; 
             $ionicLoading.hide();
            }
            });

          }
getNotis();
$scope.leerNoti = function(idNoti, estado){
console.log(estado);
if(estado==1){

              api.actualizarNoti(idNoti).then(function(data) {
           
            console.log(data);
            //$scope.nombreMaestria=data.nombreMaestria;
            if(data==null){
            //mensajeAlerta('Ha ocurrido un error, verifique su conexion a internet'); return false;
            console.log('ha ocurrido un error' );
            return false;
            }
            if(data.error){
            console.log('ha ocurrido un error' );
             
            }
            else{
             getNotis();

            }
            });

}
else{}
/*            
            api.actualizarNoti(idNoti).then(function(data) {
           
            console.log(data);
            //$scope.nombreMaestria=data.nombreMaestria;
            if(data==null){
            //mensajeAlerta('Ha ocurrido un error, verifique su conexion a internet'); return false;
            console.log('ha ocurrido un error' );
            return false;
            }
            if(data.error){
            console.log('ha ocurrido un error' );
             
            }
            else{
             getNotis();

            }
            });*/

}

    })




.controller('mainMenuCtrl', function(  $scope, $ionicLoading, $ionicHistory, api, $rootScope, $state,$ionicSlideBoxDelegate, $ionicModal) {
  
  console.log('dd');

    var userData = JSON.parse(window.localStorage.getItem('userInfoVIA'));
  $scope.nombreAlumno=  userData.nombre;


  //$scope.idDiplomado = $stateParams.idDiplomado;
  $scope.idUsuario = userData.idAlumno;



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
        
                    $ionicLoading.show();
            api.verificarEncuesta($scope.idUsuario).then(function(data) {
           
            console.log(data);
            //$scope.nombreMaestria=data.nombreMaestria;
            if(data==null){
            //mensajeAlerta('Ha ocurrido un error, verifique su conexion a internet'); return false;
            console.log('ha ocurrido un error' );
            return false;
            }
            if(data.error){
            console.log('ha ocurrido un error' );
             $ionicLoading.hide();
            }
            else{
            //$scope.modulos = data.modulos; 
             $ionicLoading.hide();
             if(data.encuestasPendientes.length>0){
              console.log('encuesta pendiente');
              console.log(data.encuestasPendientes[0].idDiplomado);
              console.log(data.encuestasPendientes[0].idModulo);

              $state.go('encuesta', { idModulo: data.encuestasPendientes[0].idModulo, idDiplomado: data.encuestasPendientes[0].idDiplomado })

             }
             else{ 
              $scope.openModal('noEncuesta.html', 'slide-in-down');
             // 
            } 

            }
            });

       

       //$state.go('encuesta');





  }

  $scope.getParametros = function(){

    //$scope.parametros={tel1:'222222'};
 $scope.parametros={};
                api.getParametros().then(function(data) {
           //$ionicLoading.show();
            console.log(data);
            //$scope.nombreMaestria=data.nombreMaestria;
            if(data==null){
            //mensajeAlerta('Ha ocurrido un error, verifique su conexion a internet'); return false;
            console.log('ha ocurrido un error' );
            return false;
            }
            if(data.error){
            console.log('ha ocurrido un error' );
           //  $ionicLoading.hide();
            }
            else{
             $scope.parametros=data.data;
           //  $ionicLoading.hide();
           console.log($scope.parametros);
           console.log($scope.parametros.param1);
            window.localStorage.setItem( 'infoTel1VIA', $scope.parametros.param3);
            }
            });


  }
$scope.getParametros();


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

        $scope.cerrarSesion = function(){

    $scope.closeModal();
    window.localStorage.setItem( 'userInfoVIA', undefined);
    $ionicHistory.clearCache();
    $state.go('login');

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



.controller('internaModuloDiplomadoCtrl', function(  $scope, $ionicLoading, api, $stateParams, $rootScope, $state,$ionicSlideBoxDelegate) {
  
    var userData = JSON.parse(window.localStorage.getItem('userInfoVIA'));
  $scope.nombreAlumno=  userData.nombre;


  $scope.idDiplomado = $stateParams.idDiplomado;
  $scope.idUsuario = userData.idAlumno;


        function actualizarVista(){
            $ionicLoading.show();
            api.getModulosDiplomado($scope.idDiplomado,$scope.idUsuario, 0).then(function(data) {
           
            console.log(data);
            $scope.nombreMaestria=data.nombreMaestria;
            if(data==null){
            //mensajeAlerta('Ha ocurrido un error, verifique su conexion a internet'); return false;
            console.log('ha ocurrido un error' );
            return false;
            }
            if(data.error){
            console.log('ha ocurrido un error' );
             $ionicLoading.hide();
            }
            else{
            $scope.modulos = data.modulos;
            $scope.nombreDiplomado = data.nombreDiplomado; 
             $ionicLoading.hide();
            }
            });
        }

actualizarVista();

      $scope.irNotaDiplomado = function(idModulo){

        $state.go('notaDiplomado',{idModulo:idModulo, idDiplomado:$scope.idDiplomado} );
        //console.log(idModulo);
      }


    })


.controller('notaMaestriaCtrl', function(  $scope, $stateParams, api, $ionicLoading, $rootScope, $state,$ionicSlideBoxDelegate) {
  
  //$scope.test= {test:[{a:'b', c:'d'},{a:'b', c:'d'}]};
      $scope.$on('cambiarModulo', function(event, args) {

          console.log(args.opcion);
          console.log('WTLSDA');
          $scope.idModulo = args.opcion;
          $scope.orden = args.orden;
          actualizarVista();
      });


    var userData = JSON.parse(window.localStorage.getItem('userInfoVIA'));
  $scope.nombreAlumno=  userData.nombre;
  $scope.idModulo = $stateParams.idModulo;
  $scope.idDiplomado = $stateParams.idDiplomado;
    $scope.idMaestria = $stateParams.idMaestria;
  $scope.idUsuario = userData.idAlumno;


            api.getMaestriaDiplomado($scope.idDiplomado,$scope.idMaestria).then(function(data) {
           $ionicLoading.show();
            console.log(data);
            //$scope.nombreMaestria=data.nombreMaestria;
            if(data==null){
            //mensajeAlerta('Ha ocurrido un error, verifique su conexion a internet'); return false;
            console.log('ha ocurrido un error' );
            return false;
            }
            if(data.error){
            console.log('ha ocurrido un error' );
             $ionicLoading.hide();
            }
            else{
            $scope.nombreMaestria = data.nombreMaestria; 
            $scope.nombreDiplomado = data.nombreDiplomado; 
             $ionicLoading.hide();
            }
            });



    $scope.nextSlide = function() {
      console.log('d');
    $ionicSlideBoxDelegate.next();
  }

      $scope.prevSlide = function() {
      console.log('d');
    $ionicSlideBoxDelegate.previous();
  }


        function actualizarVista(){
            $ionicLoading.show();
            api.getModuloInfo($scope.idModulo, $scope.idUsuario,$scope.idDiplomado).then(function(data) {
           
            console.log(data);
            //$scope.nombreMaestria=data.nombreMaestria;
            if(data==null){
            //mensajeAlerta('Ha ocurrido un error, verifique su conexion a internet'); return false;
            console.log('ha ocurrido un error' );
            return false;
            }
            if(data.error){
            console.log('ha ocurrido un error' );
             $ionicLoading.hide();
            }
            else{
            $scope.modulo = data; 
             $ionicLoading.hide();
            }
            });
        }



    })


.controller('notaTesisCtrl', function(  $scope, $stateParams, api, $ionicLoading, $rootScope, $state,$ionicSlideBoxDelegate) {
  
    var userData = JSON.parse(window.localStorage.getItem('userInfoVIA'));
  $scope.nombreAlumno=  userData.nombre;
  //$scope.idModulo = $stateParams.idModulo;
  //$scope.idDiplomado = $stateParams.idDiplomado;
  $scope.idMaestria = $stateParams.idMaestria;
  $scope.idUsuario = userData.idAlumno;


        function getNotaTesis(){
            $ionicLoading.show();
            api.getNotaTesis($scope.idUsuario,$scope.idMaestria).then(function(data) {
           
            console.log(data);
            //$scope.nombreMaestria=data.nombreMaestria;
            if(data==null){
            //mensajeAlerta('Ha ocurrido un error, verifique su conexion a internet'); return false;
            console.log('ha ocurrido un error' );
            return false;
            }
            if(data.error){
            console.log('ha ocurrido un error' );
             $ionicLoading.hide();
            }
            else{
             $scope.tesis = data; 
             $ionicLoading.hide();
            }
            });
        }
getNotaTesis();


    })


.directive('groupedRadio', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      model: '=ngModel',
      value: '=groupedRadio'
    },
    link: function(scope, element, attrs, ngModelCtrl) {
      element.addClass('button');
      element.on('click', function(e) {
        scope.$apply(function() {
          ngModelCtrl.$setViewValue(scope.value);
        });
      });

      scope.$watch('model', function(newVal) {
        element.removeClass('button-eleccion');
        if (newVal === scope.value) {
          element.addClass('button-eleccion');
        }
      });
    }
  };
})

.controller('encuestaCtrl', function(  $scope, $stateParams, $ionicNavBarDelegate, $ionicPopup, api, $ionicLoading, $rootScope, $state,$ionicSlideBoxDelegate) {
  

        $scope.$on('$ionicView.enter', function(){ //This is fired twice in a row
            var userData = JSON.parse(window.localStorage.getItem('userInfoVIA'));
  $scope.nombreAlumno=  userData.nombre;
  $scope.idUsuario = userData.idAlumno;
    });



  $scope.idModulo = $stateParams.idModulo;
  $scope.idDiplomado = $stateParams.idDiplomado;


  console.log('dd');

    $scope.nextSlide = function() {
      console.log('d');
    $ionicSlideBoxDelegate.next();
  }

      $scope.prevSlide = function() {
      console.log('d');
    $ionicSlideBoxDelegate.previous();
  }




$scope.com={};
$scope.com.comentario='';
            $ionicLoading.show();
            api.getEncuesta($scope.idModulo,$scope.idDiplomado).then(function(data) {
           
            console.log(data);
           // $scope.nombreMaestria=data.nombreMaestria;
            if(data==null){
            //mensajeAlerta('Ha ocurrido un error, verifique su conexion a internet'); return false;
            console.log('ha ocurrido un error' );
            return false;
            }
            if(data.error){
            console.log('ha ocurrido un error' );
             $ionicLoading.hide();
            }
            else{
            $scope.encuestas = data.encuesta; 
            $scope.nombreDiplomado = data.nombreDiplomado;
            $scope.nombreModulo = data.nombreModulo;
            $scope.nombreProfesor = data.nombreProfesor;
            $scope.nombreEncuesta = data.nombreEncuesta;
            $scope.idEncuesta = data.idEncuesta;

             $ionicLoading.hide();
            }
            });

     function mensajeAlerta(mensaje, borrar){

        
   var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/excla.png"> <p style="margin-top:25px">'+mensaje+'</p> </div>';

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'Cerrar',
          type: 'button-blueCustom',
          onTap: function(e) {

            if(borrar){ $scope.user.pin='';}
           
          }
        }]
      });

}


$scope.respuestas=[];
            $scope.seleccionar = function(idSeccion, numPregunta, valor){
              console.log(valor);
              $scope.respuestas[idSeccion+'-'+numPregunta]={idSeccion:idSeccion, numPregunta: numPregunta, valor:valor};
              console.log($scope.respuestas);


            }

            Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};



            $scope.enviarEncuesta = function(){
              var numPreguntas=0;
              //console.log($scope.com.comentario);
            // console.log($scope.encuestas.length)
              for(var i=0; i<$scope.encuestas.length;i++){

                for(var j=1; j<6;j++){
                  var c = 'pregunta'+j;
                  var g=' ';
               if($scope.encuestas[i][c] !== null){numPreguntas++};

                     }
              }
              //console.log(Object.size($scope.respuestas));
              //console.log(numPreguntas);

              if(Object.size($scope.respuestas) == numPreguntas){

                $ionicLoading.show();

                var secciones=[];
                for(var i=0; i<$scope.encuestas.length;i++){

                  var calificacion1= typeof $scope.respuestas[$scope.encuestas[i].idSeccion+'-1'] == 'undefined' ? null : $scope.respuestas[$scope.encuestas[i].idSeccion+'-1'].valor;
                  var calificacion2= typeof $scope.respuestas[$scope.encuestas[i].idSeccion+'-2'] == 'undefined' ? null : $scope.respuestas[$scope.encuestas[i].idSeccion+'-2'].valor;
                  var calificacion3= typeof $scope.respuestas[$scope.encuestas[i].idSeccion+'-3'] == 'undefined' ? null : $scope.respuestas[$scope.encuestas[i].idSeccion+'-3'].valor;
                  var calificacion4=typeof $scope.respuestas[$scope.encuestas[i].idSeccion+'-4'] == 'undefined' ? null : $scope.respuestas[$scope.encuestas[i].idSeccion+'-4'].valor;
                  var calificacion5= typeof $scope.respuestas[$scope.encuestas[i].idSeccion+'-5'] == 'undefined' ? null : $scope.respuestas[$scope.encuestas[i].idSeccion+'-5'].valor;

                  secciones.push({
                    idSeccion: $scope.encuestas[i].idSeccion,
                    cal1:calificacion1,
                    cal2:calificacion2,
                    cal3:calificacion3,
                    cal4:calificacion4,
                    cal5:calificacion5
                  });

                }


                     api.enviarEncuesta($scope.idModulo,$scope.idDiplomado, $scope.idUsuario, 
                        $scope.idEncuesta, secciones, $scope.com.comentario).then(function(data) {
                          console.log(data);
                      if(data==null){
                      console.log('ha ocurrido un error' );
                      mensajeAlerta('Ha ocurrido un error');
                      ionicLoading.hide();
                      return false;
                      }
                      if(data.error){
                      console.log('ha ocurrido un error' );
                       mensajeAlerta('Ha ocurrido un error');
                      $ionicLoading.hide();
                      }
                      else{

                      $ionicLoading.hide();
                      $ionicNavBarDelegate.back();
                      }
                      });

                    

              }
              else{

                mensajeAlerta('Debes evaluar todas las preguntas');
              }

            }

    })





.controller('notaDiplomadoCtrl', function(  $scope, api, $stateParams, $ionicLoading, $rootScope, $state,$ionicSlideBoxDelegate) {
  
  console.log('dd');

  

     var userData = JSON.parse(window.localStorage.getItem('userInfoVIA'));
  $scope.nombreAlumno=  userData.nombre;

  $scope.idUsuario = userData.idAlumno;


$scope.idDiplomado = $stateParams.idDiplomado;
   $scope.idModulo = $stateParams.idModulo;


               api.getModuloInfo($scope.idModulo, $scope.idUsuario,$scope.idDiplomado).then(function(data) {
           
            console.log(data);
            //$scope.nombreMaestria=data.nombreMaestria;
            if(data==null){
            //mensajeAlerta('Ha ocurrido un error, verifique su conexion a internet'); return false;
            console.log('ha ocurrido un error' );
            return false;
            }
            if(data.error){
            console.log('ha ocurrido un error' );
             $ionicLoading.hide();
            }
            else{
            $scope.modulo = data; 
             $ionicLoading.hide();
            }
            });




    })

