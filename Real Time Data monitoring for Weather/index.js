
const apiKey = "b27cf312b79ef48b183b7a02c969e12b";

async function getWeather(apiKey) {
    console.log("apiKey"); // Debugging line
    const city = document.getElementById('city-input').value.trim();
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    // Create the API request URL
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log('Request URL:', url); // Log the request URL

    try {
        const response = await fetch(url);

        // Check if response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // Log the API response

        if (data.cod === 200) {
            updateWeatherInfo(data);
        } else {
            alert(`City not found: ${data.message}`);
        }
    } catch (error) {
        alert("An error occurred while fetching the weather data.");
        console.error(error);
    }
}

getWeather();

function updateWeatherInfo(data) {
    const cityName = document.getElementById('city-name');
    const weatherDesc = document.getElementById('weather-desc');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const alerts = document.getElementById('alerts');

    cityName.textContent = `City: ${data.name}`;
    weatherDesc.textContent = `Weather Description: ${data.weather[0].description}`;
    temperature.textContent = `Temperature: ${data.main.temp} °C`;
    humidity.textContent = `Humidity: ${data.main.humidity} %`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    // Alerts based on temperature
    if (data.main.temp > 30) {
        alerts.textContent = "Alert: High temperature!";
    } else if (data.main.temp < 5) {
        alerts.textContent = "Alert: Low temperature!";
    } else {
        alerts.textContent = "No weather alerts.";
    }
}

    