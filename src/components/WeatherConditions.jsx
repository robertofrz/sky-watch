import useWeatherStore from "../store/weatherStore";
import styles from "../styles/WeatherConditions.module.css";

function WeatherConditions() {
  const isCelsius = useWeatherStore((state) => state.isCelsius);
  const currentWeather = useWeatherStore((state) => state.currentWeather);

  if (!currentWeather) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div className={styles.conditionsContainer}>
      <h1 className={styles.conditionTitle}>Weather Conditions</h1>
      <div className={styles.weatherConditions}>
        <div className={styles.condition}>
          <img src="/assets/wind.png" alt="wind icon" />
          <h3>Wind</h3>
          <p>{currentWeather.current.wind_kph}km/h</p>
        </div>
        <div className={styles.condition}>
          <img src="/assets/humidity.png" alt="humidity icon" />
          <h3>Humidity</h3>
          <p>{currentWeather.current.humidity}%</p>
        </div>
        <div className={styles.condition}>
          <img src="/assets/feelslike.png" alt="feelslike icon" />
          <h3>Feelslike</h3>
          <p>
            {isCelsius
              ? currentWeather.current.feelslike_c
              : currentWeather.current.feelslike_f}
            °{isCelsius ? "C" : "F"}
          </p>
        </div>
        <div className={styles.condition}>
          <img src="/assets/precipitation.png" alt="precipitation icon" />
          <h3>Precipitation</h3>
          <p>{currentWeather.current.precip_mm}mm</p>
        </div>
        <div className={styles.condition}>
          <img src="/assets/sunrise.png" alt="sunrise icon" />
          <h3>Sunrise</h3>
          <p>{currentWeather.forecast.forecastday[0].astro.sunrise}</p>
        </div>
        <div className={styles.condition}>
          <img src="/assets/sunset.png" alt="sunset icon" />
          <h3>Sunset</h3>
          <p>{currentWeather.forecast.forecastday[0].astro.sunset}</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherConditions;
