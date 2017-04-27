  angular.module('directives',[])
  .directive('dateSliderPicker', function($rootScope, $compile, api){
    
    return {
      restrict : 'E',
      scope: {
      cantidad: '=',
      diplo: '=',
      tipo: '='
      },
      //template: '{{cantidad}}',
      link : function($scope,$elem,$attrs) {

        var monthDays = ['S','M','T','W','Th','F','Sa'],
            onSelectDate = $attrs.onSelectDate,
            dateVar = $attrs.dateSelectVar,
            valueToWatch,
            configObj,
            totalDays = ($attrs.totalDays && parseInt($attrs.totalDays)) || 90;

            console.log('aparecer');
            console.log($scope.diplo);

            if($scope.tipo==1){getDiplomados();}
            if($scope.tipo==2){getModulos();}  
           // getDiplomados();



        if(dateVar) {
          initSelectedDate();
        }

        configObj = {
          totalDays : totalDays
        };

        function initSelectedDate() {

          var splitted = dateVar.split('.');

          if(splitted.length > 0) {
            valueToWatch = formatKeys(splitted);
          } else {
            valueToWatch = $scope.$eval(dateVar);
          }

        }

        if(!(onSelectDate)) {
          onSelectDate = function() {};
        }

        function formatKeys(key) {

          var props = key,
              len = props.length,
              index,
              obj = {},
              currKey;

          for(index = 0; index < len; index++) {
            currKey = props[index];
            obj = obj[currKey] ? obj[currKey] : $scope[currKey];
          }

          return obj;
        }


        function getDiplomados(){

           // $ionicLoading.show();

            api.getDiplomados($scope.cantidad).then(function(data) {
            
            

            if(data==null){
            //mensajeAlerta('Ha ocurrido un error, verifique su conexion a internet'); return false;
            console.log('ha ocurrido un error' );
           // $ionicLoading.hide();
            return false;
            }
            if(data.error){
            console.log('ha ocurrido un error' );
           // $ionicLoading.hide();
            }
            else{
              console.log(data.diplomados);
            $scope.resultDiplomados=data.diplomados;
           //  $scope.calendar =      [[{date:1},{date:2},{date:3},{date:4}],[{date:5},{date:6},{date:7},{date:8}],[{date:9},{date:10},{date:11},{date:12}],[{date:13},{date:14},{date:15},{date:16}]];
            // $scope.diplomados = data.diplomados;
         //     $ionicLoading.hide();


        var listado=[];
        var listadoInterno=[];

        for(var i = 1; i<=data.diplomados.length; i++){

                  console.log($scope.cantidad);
       
            
                  var dateObj = {date : data.diplomados[i-1].orden, id:data.diplomados[i-1].idDiplomado, nombre:data.diplomados[i-1].nombre};

                  if(listadoInterno.length < 4){

                          listadoInterno.push(dateObj);

                            if(data.diplomados.length==i){
                               console.log(i);
                              console.log('on1');
                              listado.push(listadoInterno);
                            }

                  }
                  else{

                            listado.push(listadoInterno);
                            listadoInterno=[];
                            listadoInterno.push(dateObj);

                                if(data.diplomados.length==i){
                                   console.log('on2');
                                listado.push(listadoInterno);
                              }

                  }
        }



        console.log('ver333');
        console.log(listado);
        $scope.isActive = isActive;
        $scope.calendar =listado; 





          //$scope.calendar =      [[{date:1},{date:2},{date:3},{date:4}],[{date:5},{date:6},{date:7},{date:8}],[{date:9},{date:10},{date:11},{date:12}],[{date:13},{date:14},{date:15},{date:16}]];
        template = "<div style='text-align: left;   color: #0958e9 ; font-size: 15px;margin-top: 5px;margin-bottom: 15px;'>{{variable2}}. {{variable}}</div><ion-slide-box on-slide-changed=\"slideHasChanged($index)\" show-pager=\"false\" active-slide=\"activeSlide\">  <ion-slide ng-repeat=\"week in calendar \"><div style=\" font-size:23px; width:70%; margin-left:15%\" class=\"row\"><div ng-repeat=\"day in week\" ng-click=\"cambiarDia(day.date, day.id, day.nombre)\" class=\"col col-17\"><div class=\"row responsive-sm responsive-md responsive-lg text-center\"><div style=\"margin-bottom:0px\" class=\"col\"><span ng-class=\"{'swipeSelected' : isActive(day.date)}\">{{day.date}}</span></div></div></div></div></ion-slide></ion-slide-box>";
        template = $compile(template)($scope);

        
        $elem.html(template);

                for(var i = 1; i<=data.diplomados.length; i++){
              if(data.diplomados[i-1].idDiplomado == $scope.diplo){


                console.log($scope.diplo);
                 console.log(data.diplomados[i-1].idDiplomado);


            $scope.o=data.diplomados[i-1].orden;
            $scope.n=data.diplomados[i-1].nombre;
             $scope.i=data.diplomados[i-1].idDiplomado;

           }
        }
        console.log($scope.i);
        $scope.cambiarDia($scope.o, $scope.i, $scope.n);


            }
            });

        }



                function getModulos(){

           // $ionicLoading.show();

            api.getModulos($scope.cantidad).then(function(data) {
            
            

            if(data==null){
            //mensajeAlerta('Ha ocurrido un error, verifique su conexion a internet'); return false;
            console.log('ha ocurrido un error' );
           // $ionicLoading.hide();
            return false;
            }
            if(data.error){
            console.log('ha ocurrido un error' );
           // $ionicLoading.hide();
            }
            else{
              console.log(data.modulos);
            $scope.resultModulos=data.modulos;
           //  $scope.calendar =      [[{date:1},{date:2},{date:3},{date:4}],[{date:5},{date:6},{date:7},{date:8}],[{date:9},{date:10},{date:11},{date:12}],[{date:13},{date:14},{date:15},{date:16}]];
            // $scope.diplomados = data.diplomados;
         //     $ionicLoading.hide();


        var listado=[];
        var listadoInterno=[];

        for(var i = 1; i<=data.modulos.length; i++){

           // console.log(i);
 
      
            var dateObj = {date : data.modulos[i-1].orden, id:data.modulos[i-1].idModulo, nombre:data.modulos[i-1].nombre};

            if(listadoInterno.length < 4){

              listadoInterno.push(dateObj);

                if($scope.cantidad==i){
                  listado.push(listadoInterno);
                }

            }
            else{

              listado.push(listadoInterno);
              listadoInterno=[];
              listadoInterno.push(dateObj);

                  if($scope.cantidad==i){
                  listado.push(listadoInterno);
                }

            }




        }
        console.log('ver333');
        $scope.isActive = isActive;
        $scope.calendar =listado; 





          //$scope.calendar =      [[{date:1},{date:2},{date:3},{date:4}],[{date:5},{date:6},{date:7},{date:8}],[{date:9},{date:10},{date:11},{date:12}],[{date:13},{date:14},{date:15},{date:16}]];
        template = "<ion-slide-box on-slide-changed=\"slideHasChanged($index)\" show-pager=\"false\" active-slide=\"activeSlide\">  <ion-slide ng-repeat=\"week in calendar\"><div style=\" font-size:23px; width:70%; margin-left:15%\" class=\"row\"><div ng-repeat=\"day in week\" ng-click=\"cambiarDia2(day.date, day.id, day.nombre)\" class=\"col col-17\"><div class=\"row responsive-sm responsive-md responsive-lg text-center\"><div style=\"margin-bottom:0px\" class=\"col\"><span ng-class=\"{'swipeSelected' : isActive(day.date)}\">{{day.date}}</span></div></div></div></div></ion-slide></ion-slide-box>";
        template = $compile(template)($scope);

        
        $elem.html(template);

                for(var i = 1; i<=data.modulos.length; i++){
              if(data.modulos[i-1].idModulo == $scope.diplo){


                console.log($scope.diplo);
                 console.log(data.modulos[i-1].idModulo);


            $scope.o=data.modulos[i-1].orden;
            $scope.n=data.modulos[i-1].nombre;
             $scope.i=data.modulos[i-1].idModulo;
               $scope.p=data.modulos[i-1].profesor;

           }
        }
        console.log($scope.i);
        $scope.cambiarDia2($scope.o, $scope.i, $scope.n,$scope.p);



            }
            });

        }


        function getKeys() {
          
          var arr = [],
              obj = this;

          for(var i in obj) {
            if(obj.hasOwnProperty(i)) {
              arr.push(i);
            }
          }

          return arr;
        }

        function daysInMonth(month,year) {
          return new Date(year, month, 0).getDate();
        }

        function generateDays() {

          var date = new Date(),
              month = date.getMonth(),
              year = date.getFullYear(),
              days = daysInMonth((month + 1),year),
              totalDays = configObj.totalDays,
              currYear = date.getFullYear(),
              currMonth = date.getMonth(),
              dates = [],
              today = date.getDate(),
              counter = today,
              currDay = date.getDay(),
              calendar = [],
              index,
              dateObj,
              template;

          for(index = 1; index <= totalDays; index++) {

            if(counter > days) {
              counter = 1;
              currMonth = (currMonth === 11) ? 0 : (currMonth + 1);
              currYear = (currMonth === 0) ? (currYear + 1 ) : currYear;
              days = daysInMonth((currMonth + 1),currYear);
            }

            dateObj = {
              date : counter,
              month : monthDays[currDay],
              fullDay : (new Date(currYear, currMonth, counter)).toDateString()
            };

            counter++;
            currDay++;

            if(currDay === 7) {
              currDay = 0;
            }

            dates.push(dateObj);

          }

          counter = 0;

          for(var i=0;i<totalDays;i++) {
            
            if ((i+1)%6 === 0) {
              counter += 1;
            }

            calendar[counter] = calendar[counter] || [];
            calendar[counter].push(dates[i]);

            if(valueToWatch === dates[i].fullDay) {
              $scope.activeSlide = counter;
            }
            
          }

          return calendar;
        }


        function isActive(day) {
         // initSelectedDate();
          return valueToWatch === day;
        }


$scope.cambiarDia = function(orden, id, nombre){


valueToWatch = orden;
console.log("orden:"+orden+" IdDiplomado:"+id);
//console.log(id);
$scope.variable = nombre;
$scope.variable2 = orden;
$rootScope.$broadcast('cambiarDiplomado',{opcion: id});


//console.log( $scope.resultDiplomados);
}

$scope.cambiarDia2 = function(orden, id, nombre, nombreProfesor){


valueToWatch = orden;
console.log("orden:"+orden+" idModulo:"+id);
//console.log(id);
$scope.variable = nombre;
$scope.variable2 = orden;
$rootScope.$broadcast('cambiarModulo',{opcion: id, orden:orden});


//console.log( $scope.resultDiplomados);
}


       // $scope.isActive = isActive;
       // $scope.calendard = generateDays();
/**
Edicion de la directiva para fines del app 
**/
       // $scope.calendar =      [[{date:1},{date:2},{date:3},{date:4}],[{date:5},{date:6},{date:7},{date:8}],[{date:9},{date:10},{date:11},{date:12}],[{date:13},{date:14},{date:15},{date:16}]];
      //  console.log($scope.calendard);

        //[[{date:1},{date:2},{date:3},{date:4}],[{date:5},{date:6},{date:7},{date:8}],[{date:9},{date:10},{date:11},{date:12}]]
 //$scope.calendar =      [[{date:1},{date:2},{date:3},{date:4}],[{date:5},{date:6},{date:7},{date:8}],[{date:9},{date:10},{date:11},{date:12}],[{date:13},{date:14},{date:15},{date:16}]];
        //template = "<ion-slide-box on-slide-changed=\"slideHasChanged($index)\" show-pager=\"false\" active-slide=\"activeSlide\"><ion-slide ng-repeat=\"week in calendar\"><div class=\"row\"><div ng-repeat=\"day in week\" ng-click=" + onSelectDate + '(day.fullDay)' + " class=\"col col-17\"><div class=\"row responsive-sm responsive-md responsive-lg text-center\"><div class=\"col\">{{day.month}}</div><div class=\"col\"><span ng-class=\"{'badge badge-positive' : isActive(day.fullDay)}\">{{day.date}}</span></div></div></div></div></ion-slide></ion-slide-box>";
        //template = $compile(template)($scope);
/*

 $scope.calendar =      [[{date:1},{date:2},{date:3},{date:4}],[{date:5},{date:6},{date:7},{date:8}],[{date:9},{date:10},{date:11},{date:12}],[{date:13},{date:14},{date:15},{date:16}]];
        template = "<ion-slide-box on-slide-changed=\"slideHasChanged($index)\" show-pager=\"false\" active-slide=\"activeSlide\">  <ion-slide ng-repeat=\"week in calendar\"><div style=\" font-size:23px; width:70%; margin-left:15%\" class=\"row\"><div ng-repeat=\"day in week\" ng-click=\"cambiarDia(day.date)\" class=\"col col-17\"><div class=\"row responsive-sm responsive-md responsive-lg text-center\"><div style=\"margin-bottom:0px\" class=\"col\"><span ng-class=\"{'swipeSelected' : isActive(day.date)}\">{{day.date}}</span></div></div></div></div></ion-slide></ion-slide-box>";
        template = $compile(template)($scope);

        
        $elem.html(template);

        */

      }
    };

  });