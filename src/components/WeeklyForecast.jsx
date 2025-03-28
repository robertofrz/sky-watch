import useWeatherStore from "../store/weatherStore";
import styles from "../styles/WeeklyForecast.module.css";

function DailyForecast() {
  const isCelsius = useWeatherStore((state) => state.isCelsius);
  const currentWeather = useWeatherStore((state) => state.currentWeather);

  if (!currentWeather) {
    return <p>Loading weather data...</p>;
  }

  const daysArray = currentWeather.forecast.forecastday;

  function getDayOfWeek(dateString) {
    const date = new Date(dateString);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  }

  return (
    <div className={styles.dailyContainer}>
      <h1 className={styles.weeklyTitle}>Weekly Forecast</h1>
      {daysArray.map((day, index) => (
        <div className={styles.day} key={day.date_epoch}>
          <p className={styles.dayOfTheWeek}>
            {index === 0 ? "Today" : getDayOfWeek(day.date)}
          </p>
          <img src={day.day.condition.icon} alt="weather icon" />
          <p>
            Min: {isCelsius ? day.day.mintemp_c : day.day.mintemp_f}°
            {isCelsius ? "C" : "F"}
          </p>
          <p>
            Max: {isCelsius ? day.day.maxtemp_c : day.day.maxtemp_f}°
            {isCelsius ? "C" : "F"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DailyForecast;
