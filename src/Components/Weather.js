import React from 'react';
import  { useState } from 'react';
import axios from 'axios';
import clearsky from './pic/clearsky.jpg';
import smoke from './pic/smoke.jpg';
import rain from './pic/rain.jpg';

function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '6778004491d12c70ccebbfc9b3b8d041';

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('City not found');
      //setError(err);
      setWeatherData(null);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
    
  };
   
  return (
    <div id='weather' className="container ">
      <h1 className="text-4xl mb-5">Weather App</h1>
      <form onSubmit={handleSubmit} className="mb-5">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="border rounded p-2" />
        <button type="submit" className="ml-2 bg-blue-500 text-white rounded p-2">Get Weather</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {weatherData && (
        <div className="bg-white p-5 rounded shadow-md">
          <h2 className="text-2xl">{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Condition: {weatherData.weather[0].description}</p>
        </div>
      )}
      
      {weatherData && weatherData.weather[0].description === 'clear sky' &&  (
        <div>
          <img alt="Clear Sky" src={clearsky} width={225} height={225} />
        </div>
      )}
      {weatherData && weatherData.weather[0].description === 'broken clouds' &&  (
        <div>
          <img alt="broken cloud" src={clearsky} width={225} height={225} />
        </div>
      )}
      {weatherData && weatherData.weather[0].description === 'overcast clouds' &&  (
        <div>
          <img alt="broken cloud" src={clearsky} width={225} height={225} />
        </div>
      )}
      {weatherData && weatherData.weather[0].description === 'few clouds' &&  (
        <div>
          <img alt="broken cloud" src={clearsky} width={225} height={225} />
        </div>
      )}
      {weatherData && weatherData.weather[0].description === 'scattered clouds' &&  (
        <div>
          <img alt="scattered clouds" src={clearsky} width={225} height={225} />
        </div>
      )}
      {weatherData && weatherData.weather[0].description === 'smoke' && (
        <div>
          <img alt="smoke" src={smoke} width={225} height={225} />
        </div>
      )}
      {weatherData && weatherData.weather[0].description === 'haze' && (
        <div>
          <img alt="haze" src={smoke} width={225} height={225} />
        </div>
      )}
      {weatherData && weatherData.weather[0].description === 'light rain' && (
        <div>
          <img alt="rain" style={{background:"blanchedalmond"}} src={rain} width={225} height={225} />
        </div>
      )}
      {weatherData && weatherData.weather[0].description === 'moderate rain' && (
        <div>
          <img alt="rain" src={rain} width={225} height={225} />
        </div>
      )}

    </div>
  );
}

export default Weather;
