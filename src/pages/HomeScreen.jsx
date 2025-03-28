import WeeklyForecast from "../components/WeeklyForecast";
import FavoritesList from "../components/FavoritesList";
import HourByHour from "../components/HourByHour";
import MainDisplay from "../components/MainDisplay";
import WeatherConditions from "../components/WeatherConditions";
import Header from "../components/Header";
import useWeatherStore from "../store/weatherStore";
import styles from "../styles/HomeScreen.module.css";

function HomeScreen() {
  const isMenuOpen = useWeatherStore((state) => state.isMenuOpen);

  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={`${styles.sideMenu} ${isMenuOpen ? "" : styles.hidden}`}>
        <FavoritesList />
      </div>
      <div
        className={`${styles.mainContent} ${
          isMenuOpen ? "" : styles.fullWidth
        }`}
      >
        <MainDisplay />
        <div className={styles.generalInfo}>
          <HourByHour />
          <div className={styles.secondaryInfo}>
            <WeatherConditions />
            <WeeklyForecast />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
