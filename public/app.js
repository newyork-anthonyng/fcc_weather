var currentMeasurement = 'F';
var celsiusTemperature, fahrenheitTemperature;

$(function() {
  getCurrentCoordinates();

  $('.convert-temperature').click(function() {
    convertTemperature();
  });
});

function getCurrentCoordinates() {
  var success = function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    getWeatherInformation(latitude, longitude);
  }

  var error = function(err) {
    updateDisplay(null, null, null, err);
  }

  navigator.geolocation.getCurrentPosition(success, error);
}

function getWeatherInformation(latitude, longitude) {
  var myUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
              latitude + '&lon=' + longitude +
              '&appid=44db6a862fba0b067b1930da0d769e98&units=imperial';

  $.ajax({
    url: myUrl
  }).done(function(data) {
    var location = data['name'] || 'Location not found';
    var description = data['weather'][0]['main'];
    var temperature = data['main']['temp'];

    fahrenheitTemperature = Number(temperature);
    celsiusTemperature = fahrenheitToCelsius(fahrenheitTemperature);

    updateDisplay(location, description, temperature);
  });
}

function updateDisplay(location, description, temperature, error) {
  var $location = $('.location');
  var $description = $('.description');
  var $temperature = $('.temperature');

  if(error) {
    $location.text = ('Error: ' + err.message);
    return false;
  }

  $location.text(location);
  $description.text(description);
  $temperature.text(temperature);
  updateBackground(description);
}

function fahrenheitToCelsius(fahrenheit) {
  return fahrenheit * (5/9) - 32;
}

function convertTemperature() {
  $temperature = $('.temperature');
  $button = $('.convert-temperature');
  var myTemperature, buttonText;

  if(currentMeasurement === 'F') {
    currentMeasurement = 'C';
    myTemperature = celsiusTemperature;
    buttonText = 'Celsius';
  } else if(currentMeasurement === 'C') {
    currentMeasurement = 'F';
    myTemperature = fahrenheitTemperature;
    buttonText = 'Fahrenheit';
  }

  $temperature.text(myTemperature);
  $button.text(buttonText);
}

function updateBackground(description) {
  $background_image = $('.background img');

  switch(description) {
    case 'clouds':
      $background_image.attr('src', './assets/clouds.png');
      break;
    default:
      $background_image.attr('src', './assets/other.png');
      break;
  }
}
