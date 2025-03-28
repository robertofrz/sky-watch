import useWeatherStore from "../store/weatherStore";
import styles from "../styles/HourByHour.module.css";

function HourByHour() {
  const isCelsius = useWeatherStore((state) => state.isCelsius);
  const currentWeather = useWeatherStore((state) => state.currentWeather);

  if (!currentWeather) {
    return <p>Loading weather data...</p>;
  }

  const hours = [
    ...currentWeather.forecast.forecastday[0].hour,
    ...currentWeather.forecast.forecastday[1].hour,
  ];

  const timeNow = `${new Date().getHours()}:00`;
  const index = hours.findIndex((hour) => hour.time.includes(timeNow));

  const next24Hours = hours.slice(index, index + 24);

  return (
    <div className={styles.hourContainer}>
      {next24Hours.map((hour) => (
        <div key={hour.time_epoch} className={styles.eachHour}>
          <p className={styles.hour}>{hour.time.split(" ")[1]}</p>
          <img src={hour.condition.icon} alt="weather icon" />
          <p>
            {isCelsius ? hour.temp_c : hour.temp_f}°{isCelsius ? "C" : "F"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default HourByHour;
