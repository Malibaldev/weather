
import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'YOUR_API_KEY'; 

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('City not found');
      setWeatherData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
      <h1 className="text-4xl mb-5">Weather App</h1>
      <form onSubmit={handleSubmit} className="mb-5">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="border rounded p-2"
        />
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
    </div>
  );
};

export default Weather;
