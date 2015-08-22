/* App Module */
angular.module('thalamusApp', [
	'ngAnimate',
	'ngRoute',
	'ui.calendar', 
	'CalendarControllers',
	'ui.bootstrap'
]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/calendar', {
        templateUrl: 'tmpl/calendar.html',
	    controller: 'CalendarCtrl'
      }).
	  when('/calendar_empty', {
        templateUrl: 'tmpl/calendar_empty.html',
	    controller: 'CalendarCtrl'
      }).
	 when('/calendar_day', {
        templateUrl: 'tmpl/calendar_day.html',
	    controller: 'CalendarCtrl'
      }).
       when('/calendar_apl', {
        templateUrl: 'tmpl/calendar_apl.html',
	    controller: 'CalendarCtrl'
      }).
             when('/documents', {
        templateUrl: 'tmpl/add_doc_cat.html'
      }).
      	when('/documents/list', {
        templateUrl: 'tmpl/doc_list.html'
      }).
	when('/administration', {
        templateUrl: 'tmpl/security.html'
      }).
	 when('/administration/users', {
        templateUrl: 'tmpl/security.html'
      }).
	 when('/administration/roles', {
        templateUrl: 'tmpl/security_roles.html'
      }).
	when('/documents', {
        templateUrl: 'tmpl/add_doc_cat.html'
      }).
	when('/documents/list', {
        templateUrl: 'tmpl/doc_list.html'
      }).
	when('/applicants', {
        templateUrl: 'tmpl/applicants.html'
      }).
      when('/', {
        templateUrl: 'tmpl/main.html'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
  
/* Controllers */

angular.module('CalendarControllers', []).controller("CalendarCtrl", ["$scope", "$compile", "uiCalendarConfig", function($scope, $compile, uiCalendarConfig) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.changeTo = 'Hungarian';
    /* event source that pulls from google.com */
    //$scope.eventSource = {
    //    url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
    //    className: 'gcal-event', // an option!
    //    currentTimezone: 'America/Chicago' // an option!
    //};
    /* event source that contains custom events on the scope */
    $scope.events = [
        //{ title: 'All Day Event', start: new Date(y, m, 1) },
        //{ title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2) },
        //{ id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: false },
        //{ id: 999, title: 'Repeating Event', start: new Date(y, m, d + 4, 16, 0), allDay: false },
        {
            title: 'Interview',
            start: new Date(y, m, d, 2, 0),
            end: new Date(y, m, d, 6, 0),
            allDay: false,
            textColor: "white",
            distribution: [
                { tierTitle: 'Tier 1: ', slots: 2, slotsTotal: 4 },
                { tierTitle: 'Tier 2: ', slots: 3, slotsTotal: 4 },
                { tierTitle: 'Tier 3: ', slots: 0, slotsTotal: 2 },
                { tierTitle: 'Wait List: ', slots: 0 }
            ]
        },
        { title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/' }
    ];
    /* event source that calls a function on every view switch */
    //$scope.eventsF = function(start, end, timezone, callback) {
    //    var s = new Date(start).getTime() / 1000;
    //    var e = new Date(end).getTime() / 1000;
    //    var m = new Date(start).getMonth();
    //    var events = [{ title: 'Feed Me ' + m, start: s + (50000), end: s + (100000), allDay: false, className: ['customFeed'] }];
    //    callback(events);
    //};

    //$scope.calEventsExt = {
    //    color: '#f00',
    //    textColor: 'yellow',
    //    events: [
    //        { type: 'party', title: 'Lunch', start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 0), allDay: false },
    //        { type: 'party', title: 'Lunch 2', start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 0), allDay: false },
    //        { type: 'party', title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/' }
    //    ]
    //};
    /* alert on eventClick */
    $scope.alertOnEventClick = function(date, jsEvent, view) {
        $scope.alertMessage = (date.title + ' was clicked ');
    };
    /* alert on Drop */
    $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view) {
        $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view) {
        $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources, source) {
        var canAdd = 0;
        angular.forEach(sources, function(value, key) {
            if (sources[key] === source) {
                sources.splice(key, 1);
                canAdd = 1;
            }
        });
        if (canAdd === 0) {
            sources.push(source);
        }
    };
    /* add custom event*/
    $scope.addEvent = function() {
        $scope.events.push({
            title: 'Open Sesame',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            className: ['openSesame']
        });
    };
    /* remove event */
    $scope.remove = function(index) {
        $scope.events.splice(index, 1);
    };
    /* Change View */
    $scope.changeView = function(view, calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
		 $scope.menuactive = view;

    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
        if (uiCalendarConfig.calendars[calendar]) {
            uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
    };
    /* Render Tooltip */
   $scope.eventRender = function(event, element, view) {
        element.attr({
            'tooltip': event.title,
            'tooltip-append-to-body': true
        });
        $compile(element)($scope);
    };
    /* config object */
    $scope.uiConfig = {
        calendar: {
            height: 720,
            editable: true,
            allDay: false,
            header: {
                left: 'today prev,next',
                center: 'title',
                right: ''
            },
            eventClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            //eventRender: $scope.eventRender
        }
    };

    $scope.changeLang = function() {
        if ($scope.changeTo === 'Hungarian') {
            $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
            $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
            $scope.changeTo = 'English';
        } else {
            $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            $scope.changeTo = 'Hungarian';
        }
    };
    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.calEventsExt];
	 $scope.menuactive ='month';
    //$scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    //$scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
}]);
/* EOF */