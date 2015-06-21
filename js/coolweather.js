function Forecast(temperature, wind, desc, high, low, iconID, date) {
	//creates object class "Forecast"
	this.temperature = temperature;
	this.wind = wind;
	this.desc = desc;
	this.high = high;
	this.low = low;
	this.iconID = iconID;
	this.date = date;

	this.skycon = function pickIcon(iconID) {
					
					var clearSky = [800];
					var partlyCloudy = [801];
					var cloudy = [802, 803, 804];
					var rain = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232, 300, 301, 302, 310, 311, 312, 313, 314, 321, 500, 501, 502, 503, 504, 511, 520, 521, 522, 531];
					var sleet = [611, 612, 615, 616, 906];
					var snow = [600, 601, 602, 620, 621, 622];
					var windy = [900, 901, 902, 905, 956, 957, 958, 959, 960, 961, 962];
					var misty = [701, 741];

					if (clearSky.indexOf(iconID) >= 0) {
						return Skycons.CLEAR_DAY;	
					} else if (partlyCloudy.indexOf(iconID) >= 0) {
						return Skycons.PARTLY_CLOUDY_DAY;
					} else if (cloudy.indexOf(iconID) >= 0) {
						return Skycons.CLOUD_DAY;
					} else if (rain.indexOf(iconID) >= 0) {
						return Skycons.RAIN;
					} else if (sleet.indexOf(iconID) >= 0) {
						return Skycons.SLEET;
					} else if (snow.indexOf(iconID) >= 0) {
						return Skycons.SNOW;
					} else if (windy.indexOf(iconID) >= 0) {
						return Skycons.WIND;
					} else if (misty.indexOf(iconID) >= 0) {
						return Skycons.MIST;
					}
				};
};

function obtainCurrentWeather(currentWeather) {
	//returns current weather conditions at device's location.

	var todayCurrent = new Forecast(Math.round(currentWeather.main.temp), Math.round(currentWeather.wind.speed), currentWeather.weather[0].description, Math.round(currentWeather.main.temp_max), Math.round(currentWeather.main.temp_min), currentWeather.weather[0].id);
	document.getElementById('tempToday').innerHTML = todayCurrent.temperature + "\&#176C";
	document.getElementById('location').innerHTML = currentWeather.name;
	document.getElementById('description').innerHTML = todayCurrent.desc+', wind ' + todayCurrent.wind + ' km/h.';

	var skycons = new Skycons({"color": "white"});
	skycons.add("iconMain", todayCurrent.skycon(todayCurrent.iconID));
	skycons.play();
}

function obtainForecast(forecastedWeather) {
	//returns forecasted weather conditions at device's location for today and next 3 days.

		var date = new Date();
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


		var todayForecasted = new Forecast(Math.round(forecastedWeather.list[0].temp.day), Math.round(forecastedWeather.list[0].speed), forecastedWeather.list[0].weather[0].description, Math.round(forecastedWeather.list[0].temp.max), Math.round(forecastedWeather.list[0].temp.min), forecastedWeather.list[0].weather[0].id, 'Today');
		var tomorrow = new Forecast(Math.round(forecastedWeather.list[1].temp.day), Math.round(forecastedWeather.list[1].speed), forecastedWeather.list[1].weather[0].description, Math.round(forecastedWeather.list[1].temp.max), Math.round(forecastedWeather.list[1].temp.min), forecastedWeather.list[1].weather[0].id, weekday[(date.getDay() + 1) % 7]);
		var day3 = new Forecast(Math.round(forecastedWeather.list[2].temp.day), Math.round(forecastedWeather.list[2].speed), forecastedWeather.list[2].weather[0].description, Math.round(forecastedWeather.list[2].temp.max), Math.round(forecastedWeather.list[2].temp.min), forecastedWeather.list[2].weather[0].id, weekday[(date.getDay() + 2) % 7]);
		var day4 = new Forecast(Math.round(forecastedWeather.list[3].temp.day), Math.round(forecastedWeather.list[3].speed), forecastedWeather.list[3].weather[0].description, Math.round(forecastedWeather.list[3].temp.max), Math.round(forecastedWeather.list[3].temp.min), forecastedWeather.list[3].weather[0].id, weekday[(date.getDay() + 3) % 7])

		//Begin formating table
		document.getElementById('headers').children[2].innerHTML = weekday[(date.getDay() + 2) % 7]; 
		document.getElementById('headers').children[3].innerHTML = weekday[(date.getDay() + 3) % 7]; 
		//todays forecast
		document.getElementById('highs').children[0].innerHTML = todayForecasted.high + "\&#176C";
		document.getElementById('lows').children[0].innerHTML = todayForecasted.low + "\&#176C";
		document.getElementById('descriptions').children[0].innerHTML = todayForecasted.desc;
		//tomorrow's forecast
		document.getElementById('highs').children[1].innerHTML = tomorrow.high + "\&#176C";
		document.getElementById('lows').children[1].innerHTML = tomorrow.low + "\&#176C";
		document.getElementById('descriptions').children[1].innerHTML = tomorrow.desc;
		//day3's forecast
		document.getElementById('highs').children[2].innerHTML = day3.high + "\&#176C";
		document.getElementById('lows').children[2].innerHTML = day3.low + "\&#176C";
		document.getElementById('descriptions').children[2].innerHTML = day3.desc;
		//day4's forecast
		document.getElementById('highs').children[3].innerHTML = day4.high + "\&#176C";
		document.getElementById('lows').children[3].innerHTML = day4.low + "\&#176C";
		document.getElementById('descriptions').children[3].innerHTML = day4.desc;
		//load icons

		var skycons = new Skycons({"color": "white"});
					
		skycons.add("iconToday", todayForecasted.skycon(todayForecasted.iconID));
		skycons.add("iconTomorrow", tomorrow.skycon(tomorrow.iconID));
		skycons.add("iconDay3", day3.skycon(day3.iconID));
		skycons.add("iconDay4", day4.skycon(day4.iconID));
		skycons.play();

		document.getElementsByTagName("table")[0].style.visibility = "visible";
}

if (navigator.geolocation) {

	document.getElementById('message').innerHTML = 'Finding your location...';

	navigator.geolocation.getCurrentPosition(function (position) {
	
		document.getElementById('message').innerHTML = 'Getting the weather forecast...';

		var script1 = document.createElement('script');
		document.querySelector('head').appendChild(script1);
		script1.src = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+ position.coords.latitude +'&lon='+ position.coords.longitude +'&cnt=5&units=metric&callback=obtainForecast';

		var script2 = document.createElement('script');
		document.querySelector('head').appendChild(script2);
		script2.src = 'http://api.openweathermap.org/data/2.5/weather?lat='+ position.coords.latitude +'&lon='+ position.coords.longitude +'&units=metric&callback=obtainCurrentWeather';

		document.getElementById('message').innerHTML = '';

}, function (error) {

	switch(error.code) {
	    case error.PERMISSION_DENIED:
	      document.getElementById('message').innerHTML = 'User denied the request for geolocation. Please enable geolocation and try again.';
	      break;
	    case error.POSITION_UNAVAILABLE:
	      document.getElementById('message').innerHTML = 'Position information is currently unavailable. Please try again.';
	      break;
	    case error.TIMEOUT:
	      document.getElementById('message').innerHTML = 'The request to get user position data timed out. Please try again.';
	      break;
	    case error.UNKNOWN_ERROR:
	      document.getElementById('message').innerHTML = 'An unknown error occured. Please try again.';
	      break;
    }

});

} else {
alert('Oops! geolocation appears to be disabled.  Please enable it and try again.');
}

