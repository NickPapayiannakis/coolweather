var today = undefined;
var tomorrow = undefined;
var day3 = undefined;
var day4 = undefined;
var day5 = undefined;
var latitude = undefined;
var longitude = undefined;

function forecast(temperature, wind, desc, high, low, icon, date) {
	
	this.temperature = temperature;
	this.wind = wind;
	this.desc = description;
	this.high = high;
	this.low = low;
	this.icon = icon;

	this.date = date;

};

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {

			alert('got it baby!');

			today = position;			

		}, function (error) {

			alert(error.code);

		});
	} else {
		alert('Oops, geolocation appears to be disabled!  Please turn it on and try again.');
	};

console.log(today.latitude);