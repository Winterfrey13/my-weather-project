function formatDate() {
  let now = new Date();
  let currentdate = now.getDate();
  let currenthour = now.getHours();
  let currentminutes = now.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesay",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentday = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentmonth = months[now.getMonth()];

  let newFormattedDate = `${currentday}, ${currentmonth} ${currentdate}, ${currenthour}h:${currentminutes}mins `;

  let realDate = document.querySelector("#real-date");
  realDate.innerHTML = `${newFormattedDate}`;
}

formatDate();

function showcityWeather(response) {
  let cityTemperature = document.querySelector("#real-temperature");
  let temperature = Math.round(response.data.main.temp);
  cityTemperature.innerHTML = `${temperature}`;

  let cityHumidity = document.querySelector("#real-hum");
  let humidity = Math.round(response.data.main.humidity);
  cityHumidity.innerHTML = `${humidity}`;

  let cityWindspeed = document.querySelector("#real-wind");
  let windspeed = Math.round(response.data.wind.speed);
  cityWindspeed.innerHTML = `${windspeed}`;

  let citySky = document.querySelector("#sky-description");
  citySky.innerHTML = `${response.data.weather[0].main}`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  let typeCity = document.querySelector("#city-input");
  typeCity.innerHTML = `${searchInput.value}`;

  let apiKey = "a12625e1bdacd96f446510cf97673433";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showcityWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showcurrentWeather(response) {
  let currentTemperature = document.querySelector("#real-temperature");
  let temperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = `${temperature}`;

  let currentHumidity = document.querySelector("#real-hum");
  let humidity = Math.round(response.data.main.humidity);
  currentHumidity.innerHTML = `${humidity}`;

  let currentWindspeed = document.querySelector("#real-wind");
  let windspeed = Math.round(response.data.wind.speed);
  currentWindspeed.innerHTML = `${windspeed}`;

  let currentSky = document.querySelector("#sky-description");
  currentSky.innerHTML = `${response.data.weather[0].main}`;

  let currentCity = document.querySelector("#city-input");
  currentCity.innerHTML = `${response.data.name}`;
}

function retrievePosition(position) {
  let apiKey = "a12625e1bdacd96f446510cf97673433";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showcurrentWeather);
}
function currentButton() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let greenButton = document.querySelector("#current-location");
greenButton.addEventListener("click", currentButton);
