  angular.module('directives',[])
  .directive('dateSliderPicker',['$compile',function($compile){
    
    return {
      restrict : 'E',
      link : function($scope,$elem,$attrs) {

        var monthDays = ['S','M','T','W','Th','F','Sa'],
            onSelectDate = $attrs.onSelectDate,
            dateVar = $attrs.dateSelectVar,
            valueToWatch,
            configObj,
            totalDays = ($attrs.totalDays && parseInt($attrs.totalDays)) || 90;



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


$scope.cambiarDia = function(d){

valueToWatch = d;
console.log(d);
}


        $scope.isActive = isActive;
       $scope.calendard = generateDays();
      $scope.calendar =      [[{date:1},{date:2},{date:3},{date:4}],[{date:5},{date:6},{date:7},{date:8}],[{date:9},{date:10},{date:11},{date:12}],[{date:13},{date:14},{date:15},{date:16}]];
        console.log($scope.calendard);

        [[{date:1},{date:2},{date:3},{date:4}],[{date:5},{date:6},{date:7},{date:8}],[{date:9},{date:10},{date:11},{date:12}]]

        //template = "<ion-slide-box on-slide-changed=\"slideHasChanged($index)\" show-pager=\"false\" active-slide=\"activeSlide\"><ion-slide ng-repeat=\"week in calendar\"><div class=\"row\"><div ng-repeat=\"day in week\" ng-click=" + onSelectDate + '(day.fullDay)' + " class=\"col col-17\"><div class=\"row responsive-sm responsive-md responsive-lg text-center\"><div class=\"col\">{{day.month}}</div><div class=\"col\"><span ng-class=\"{'badge badge-positive' : isActive(day.fullDay)}\">{{day.date}}</span></div></div></div></div></ion-slide></ion-slide-box>";
        //template = $compile(template)($scope);

        template = "<ion-slide-box on-slide-changed=\"slideHasChanged($index)\" show-pager=\"false\" active-slide=\"activeSlide\">  <ion-slide ng-repeat=\"week in calendar\"><div style=\" font-size:23px; width:70%; margin-left:15%\" class=\"row\"><div ng-repeat=\"day in week\" ng-click=\"cambiarDia(day.date)\" class=\"col col-17\"><div class=\"row responsive-sm responsive-md responsive-lg text-center\"><div style=\"margin-bottom:0px\" class=\"col\"><span ng-class=\"{'swipeSelected' : isActive(day.date)}\">{{day.date}}</span></div></div></div></div></ion-slide></ion-slide-box>";
        template = $compile(template)($scope);

        
        $elem.html(template);

      }
    };

  }]);