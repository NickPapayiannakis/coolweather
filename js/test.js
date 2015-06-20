//Obtain position coordniates
navigator.geolocation.getCurrentPosition(function(success){
    $("#message").text("Checking the weather forecast...");
    //Query openweathermap.org API for weather data
    $.ajax({
	    dataType: "jsonp",
	    url: "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=metric",
	    success: function(data) {
	    	//Inject weather data into index.html
	    	$("#message").text("");
	    	
	    	var actualTemp = Math.round(data.main.temp);
	    	$("#temp").text(actualTemp + "\u00B0");

	    	var locationName = data.name;
	    	var locationNameUC = locationName.toUpperCase();
	    	$("#location").text(locationNameUC);

	    	var weatherDescription = data.weather[0].description;
	    	$("#description").text("Description: " + weatherDescription);
			
			var windSpeed = (data.wind.speed);
			$("#wind").text("Wind: " + Math.round(windSpeed * 3.6) + " km/h");

			$("#signature").text = ("An experiment in GeoLocation, by <a url=\"http:\/\/www.nickpapayiannakis.com\">Nick Papayiannakis</a>");
	    },
	    //Display error if weather data query fails
	    error: function(error){
	    	$("#message").text("Weather data currently unavailable.  Please try again.");
	    }
	});
	//If geolocation fails, display appropriate error
 }, function (error) {
 		  switch(error.code) {
		    case error.PERMISSION_DENIED:
		      $("#message").text("User denied the request for geolocation.  Please enable geolocation");
		      break;
		    case error.POSITION_UNAVAILABLE:
		      $("#message").text("Position information is currently unavailable.  Please try again.");
		      break;
		    case error.TIMEOUT:
		      $("#message").text("The request to get user position data timed out.  Please try again.");
		      break;
		    case error.UNKNOWN_ERROR:
		      $("#message").text("An unknown error occured. Please try again.");
		      break;
		  }
	});





