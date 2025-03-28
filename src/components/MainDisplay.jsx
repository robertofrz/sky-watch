import { useState } from "react";
import useWeatherStore from "../store/weatherStore";
import styles from "../styles/MainDisplay.module.css";

function MainDisplay() {
  const [city, setCity] = useState("");
  const isCelsius = useWeatherStore((state) => state.isCelsius);
  const setLocation = useWeatherStore((state) => state.setLocation);
  const currentWeather = useWeatherStore((state) => state.currentWeather);

  if (!currentWeather) {
    return <p>Loading weather data...</p>;
  }

  function handleSearch() {
    if (city) {
      setLocation(city);
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className={styles.mainDisplay}>
      <div className={styles.searchInputContainer}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          className={styles.searchInput}
        />
        <button className={styles.searchBtn} onClick={handleSearch}>
          <img
            src="/search-icon.png"
            className={styles.searchIcon}
            alt="search icon"
          />
        </button>
      </div>
      <div className={styles.currentContainer}>
        <h1>{currentWeather.location.name}</h1>
        <h2>{currentWeather.location.country}</h2>
        <p className={styles.mainTemp}>
          {isCelsius
            ? currentWeather.current.temp_c
            : currentWeather.current.temp_f}
          °{isCelsius ? "C" : "F"}
        </p>
        <p className={styles.currentCondition}>
          {currentWeather.current.condition.text}
        </p>
        <div className={styles.currentMinMax}>
          <p>
            Min:{" "}
            {isCelsius
              ? currentWeather.forecast.forecastday[0].day.mintemp_c
              : currentWeather.forecast.forecastday[0].day.mintemp_f}
            °{isCelsius ? "C" : "F"}
          </p>
          <p>
            Max:{" "}
            {isCelsius
              ? currentWeather.forecast.forecastday[0].day.maxtemp_c
              : currentWeather.forecast.forecastday[0].day.maxtemp_f}
            °{isCelsius ? "C" : "F"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainDisplay;
