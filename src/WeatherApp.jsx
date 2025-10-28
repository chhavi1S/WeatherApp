import React, { useState } from "react";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city or country name.");
      setWeather(null);
      return;
    }

    try {
      setError("");
      const apiKey = "4b92cc8bfae04f98bab113604252810"; 
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        setError(data.error.message);
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Unable to fetch weather data. Try again.");
      setWeather(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🌤 Weather Now</h1>


      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city or country "
          className="px-4 py-2 rounded-md text-black focus:outline-none border-b"
        />
        <button
          onClick={fetchWeather}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-semibold ml-3"
        >
          Search
        </button>
      </div>

     
      {error && <p className="text-red-200">{error}</p>}

     
      {weather && (
        <div className="bg-white text-black p-6 rounded-2xl shadow-lg w-80 text-center">
          <h2 className="text-2xl font-bold mb-2">{weather.location.name}</h2>
          <p className="text-lg capitalize">{weather.current.condition.text}</p>
          <img
            src={weather.current.condition.icon}
            alt="Weather Icon"
            className="mx-auto my-2 w-16 h-16"
          />
          <h3 className="text-4xl font-semibold mt-3">
            {weather.current.temp_c}°C
          </h3>
          <p className="mt-2">Humidity: {weather.current.humidity}%</p>
          <p>Wind: {weather.current.wind_kph} km/h</p>
          <p className="text-sm text-gray-600 mt-3">
            Last updated: {weather.current.last_updated}
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;


