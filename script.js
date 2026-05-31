const apiKey = "1d052dc4c22e17cac36adcde56e120c3";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherIcon = document.getElementById("weatherIcon");

const weatherCard = document.querySelector(".weather-card");
const errorBox = document.querySelector(".error");

async function getWeather(city) {

    const apiUrl =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        console.log(data);

        // Update Weather Data
        cityName.textContent = data.name;

        temperature.textContent =
            Math.round(data.main.temp) + "°C";

        description.textContent =
            data.weather[0].description;

        humidity.textContent =
            data.main.humidity + "%";

        windSpeed.textContent =
            data.wind.speed + " km/h";

        // Weather Icons
        const weatherMain = data.weather[0].main;

        if (weatherMain === "Clear") {
            weatherIcon.src = "./Images/sun.png";
        }
        else if (weatherMain === "Clouds") {
            weatherIcon.src = "./Images/clouds.png";
        }
        else if (weatherMain === "Rain") {
            weatherIcon.src = "./Images/rain.png";
        }
        else if (weatherMain === "Snow") {
            weatherIcon.src = "./Images/snow.png";
        }
        else if (weatherMain === "Drizzle") {
            weatherIcon.src = "./Images/drizzle.png";
        }
        else if (
            weatherMain === "Mist" ||
            weatherMain === "Fog" ||
            weatherMain === "Haze"
        ) {
            weatherIcon.src = "./Images/mist.png";
        }
        else {
            weatherIcon.src = "./Images/sun.png";
        }

        // Hide Error
        errorBox.style.display = "none";

        // Show Weather Card
        weatherCard.style.display = "block";

    }
    catch (error) {

        console.log(error);

        // Hide Weather Card
        weatherCard.style.display = "none";

        // Show Error
        errorBox.style.display = "block";
    }
}

// Search Button
searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city !== "") {
        getWeather(city);
    }
});

// Enter Key Support
cityInput.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {

        const city = cityInput.value.trim();

        if (city !== "") {
            getWeather(city);
        }
    }
});