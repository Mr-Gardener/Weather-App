const apiKey = '4acc2ad41ccb29a9e9d04584965d7cc1';
const locationInput = document.getElementById('location-input');
const search = document.getElementById('search');
const weatherOutput = document.getElementById('weather-output');


search.addEventListener('click', function(){
    let location = locationInput.value;
    if(location){
        fetchWeather(location);
    } else {
        weatherOutput.innerHTML = '<p>Please enter a location.</p>';
    }
});

async function fetchWeather(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metrics`);
        console.log(response); // Log the response for debugging
        
        if(!response.ok) throw new Error('location not found');
        const weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        weatherOutput.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeather(data){
    const {name, main, weather} = data;
    weatherOutput.innerHTML = `
        <p>Location: ${name}</p>
        <p>Temperature: ${(main.temp - 273.15).toFixed(2)} °C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}</p>
    `;
}
