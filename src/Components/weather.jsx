import { useState } from 'react';
import './weather.css';

const API_KEY = '01ac0659b3a3742650c0a708850748bc';

function Weather() {
 const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
        setError('');
      } else {
        setWeather(null);
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch weather');
    }
  };


  return (
     <div className='weather-app'>
      <h1 className='app-title'>Weather App</h1>
      <input className='search-input'
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button  className="search-button" onClick={fetchWeather}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>{weather.main.temp} °C</p>
          <p>{weather.weather[0].main}</p>
          <img className='weather-icon'
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>

  );
}

export default Weather;
