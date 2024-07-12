import { useEffect, useRef, useState } from "react";

import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import cloud_icon from "../assets/cloud.png";

export function Weather() {
  const input = useRef("Bangalore");
  const [weatherData, setWeatherData] = useState(false);
  const [loading, setLoading] = useState(false);

  const allIconsCode = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  async function search(city) {
    if (city === "") {
      alert("Enter city name");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=63cdbdf7ff1be9ed8de0b0b5b93454de&units=metric`
      );
      const data = await res.json();
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: allIconsCode[data.weather[0].icon] || clear_icon,
        lat: data.coord.lat,
        lon: data.coord.lon,
      });
      setLoading(false);
    } catch (e) {
      setWeatherData(false);
      console.log("Error: ", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    search("Bangalore");
  }, []);

  return (
    <div className="container">
      <header className="search-bar">
        <input
          ref={input}
          type="text"
          placeholder="Search"
          onKeyDown={(e) => {
            if (e.key === "Enter") search(input.current.value);
          }}
        />
        <img
          src={search_icon}
          alt=""
          onClick={() => search(input.current.value)}
        />
      </header>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : weatherData ? (
        <main>
          <img className="weather-icon" src={weatherData.icon} alt="" />
          <p className="temperature">{weatherData.temperature}°c</p>
          <p className="location">{weatherData.location}</p>

          <div className="weather-data">
            <div className="lat-lon">
              <div>
                <p>Latitude</p>
                <p>{weatherData.lat}</p>
              </div>
              <div>
                <p>Longitude</p>
                <p>{weatherData.lon}</p>
              </div>
            </div>
            <div className="humidity-wind">
              <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                  <p>{weatherData.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                  <p>{weatherData.windSpeed} km/h</p>
                  <span>Wind speed </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <div className="city-not-found">
          <h2>City not found</h2>
          <h3>
            Enter a <span>correct city</span> name
          </h3>
        </div>
      )}
    </div>
  );
}
