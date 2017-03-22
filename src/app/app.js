'use strict';

// Define our application.
var app = angular.module('webApplicationPractical', ['ngTouch', 'ngAnimate', 'toastr']);

// Set up the toast configurations.
app.config(function(toastrConfig) {
    angular.extend(toastrConfig, {
        autoDismiss: true,
        containerId: 'toast-container',
        maxOpened: 0,
        newestOnTop: true,
        positionClass: 'toast-top-center',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        target: 'body'
    });
// Create the controller.
}).controller('webApplicationPracticalController', function($http, $scope, toastr) {
    // Set the item variable as null, this will be a reference when we want to add data to it later.
    $scope.item = null;
    $scope.itemImage = null;
    $scope.windDirection = null;
    $scope.currDate = null;
    $scope.sunrise = null;
    $scope.sunset = null;
    // A boolean flag to indicate a API call.
    $scope.showSpinner = false;

    /**
     * The searchWeather() function.
     *
     * @description This function will :
     *
     * 1) Get the users latitude & longitude through the HTML5 geolocation API if available,
     *    otherwise it will warn the user that the functionality is not available with their current setup.
     *
     * 2) Make an API call openweathermap.org with the users co-ordinates and display the data to the user on success or
     *    show a meaningful error if unsuccessful.
     *
     * @returns nothing.
     */
    $scope.searchWeather = function() {

        $scope.item = null;
        $scope.itemImage = null;

		var startPos,
            currentLat = null,
            currentLon = null;

        // If the browser supports geoLocation.
        if (navigator.geolocation) {
            // Set a timeout so the user does not have to wait.
            var geoOptions = {
                timeout: 5000
            };
            // Get the users co-ordinates and make an API call to get the weather for their area.
            navigator.geolocation.getCurrentPosition(function(position) {
                // Set the start position.
                startPos = position;
                // Set the latitude.
                currentLat = position.coords.latitude;
                // Set the longitude.
                currentLon = position.coords.longitude;
                // Show the spinner animation.
                $scope.showSpinner = true;
                // Make the API call.
                $http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + currentLat + '&lon=' + currentLon + '&appid=91e4b7cafff4491a31996d3839a7540a&units=metric')
                // Success! We can render the data to the UI.
                .success(function(data) {
                    // Bind the data to the relevant vars.
                    $scope.item = data;
                    $scope.itemImage = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
                    $scope.windDirection = getWindDirection(data.wind.deg);
                    $scope.currDate = prettyDate(data.dt);
                    $scope.sunrise = prettyTime(data.sys.sunrise);
                    $scope.sunset = prettyTime(data.sys.sunset);
                    // Hide the spinner.
                    $scope.showSpinner = false;
                })
                // API Error! Display an error message in the UI.
                .error(function(error) {
                    console.log('An error occurred :) \r\n More info : ' + error.message + ' (' + error.cod + ')');
                    // Hide the spinner.
                    $scope.showSpinner = false;
                    // Show error message.
                    toastr.error('An error occurred', 'More info : ' + error.message + ' (' + error.cod + ')');
                });
            },
            function(error) {
                console.log('Error occurred. Error code: ' + error.code);
                // 0: unknown error.
                if (error.code === 0) {
                    // Show error message.
                    toastr.error('An error occurred', 'More info : ' + error.message + ' (' + error.cod + ')');
                }
                // 1: permission denied.
                if (error.code === 1) {
                    // Show error message.
                    toastr.error('An error occurred', 'More info : ' + error.message + ' (' + error.cod + ')');
                }
                // 2: position unavailable (error response from location provider).
                if (error.code === 2) {
                    // Show error message.
                    toastr.error('An error occurred', 'More info : ' + error.message + ' (' + error.cod + ')');
                }
                // 3: timed out.
                if (error.code === 3) {
                    // Show error message.
                    toastr.error('An error occurred', 'More info : ' + error.message + ' (' + error.cod + ')');
                }
            }, geoOptions);

        // The setup does not support geoLocation.
        } else {
            // Display an error message.
            toastr.error('Sorry :(', 'Geolocation is not supported for this Browser/OS.');
        }
	};

	var prettyDate = function (date) {
	        // Set the months array so we can get the friendly name of the month.
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            // Multiply by 1000 so that it is read in milliseconds, not seconds.
            myDate = new Date(date * 1000);

        return myDate.getUTCDate() + ' ' + months[myDate.getUTCMonth()] + ', ' + myDate.getUTCFullYear();
    };

    var prettyTime = function (date) {
        // multiply by 1000 so that it is read in milliseconds, not seconds.
        var myDate = new Date(date * 1000),
            // Get the hours from the timestamp.
            hours = myDate.getHours(),
            // Get the minutes from the timestamp.
            minutes = "0" + myDate.getMinutes(),
            // Get the seconds from the timestamp.
            seconds = "0" + myDate.getSeconds();

        // Display the time in 10:30:23 format.
        return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    };


  var getWindDirection = function (angle) {
    // Specify the amount of directions required.
    var directions = 8,
      // Set the degree from the angle received.
      degree = 360 / directions;
      angle = angle + degree / 2;

    if (angle >= degree && angle < degree) {
      return "North";
    }

    if (angle >= degree && angle < 2 * degree) {
      return "North East";
    }

    if (angle >= 2 * degree && angle < 3 * degree) {
      return "East";
    }

    if (angle >= 3 * degree && angle < 4 * degree) {
      return "South East";
    }

    if (angle >= 4 * degree && angle < 5 * degree) {
      return "South";
    }

    if (angle >= 5 * degree && angle < 6 * degree) {
      return "South West";
    }

    if (angle >= 6 * degree && angle < 7 * degree) {
      return "West";
    }

    if (angle >= 7 * degree && angle < 8 * degree) {
      return "North West";
    }

    // Return an empty string if none of the above conditions apply.
    return '';
  };
});
