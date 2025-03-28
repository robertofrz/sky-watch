import useWeatherStore from "../store/weatherStore";
import styles from "../styles/Header.module.css";

function Header() {
  const isMenuOpen = useWeatherStore((state) => state.isMenuOpen);
  const setIsMenuOpen = useWeatherStore((state) => state.setIsMenuOpen);
  const isCelsius = useWeatherStore((state) => state.isCelsius);
  const toggleTemperatureUnit = useWeatherStore(
    (state) => state.toggleTemperatureUnit
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function toggleTempUnit() {
    toggleTemperatureUnit(!isCelsius);
  }

  return (
    <header className={styles.header}>
      <div className={styles.leftContent}>
        <button className={styles.menuToggle} onClick={toggleMenu}>
          <img
            className={styles.menuIcon}
            src="./menu-icon.png"
            alt="menu icon"
          />
        </button>
        <div className={styles.temperatureToggle}>
          <label className={styles.switch} htmlFor="myToggle">
            <input
              type="checkbox"
              checked={isCelsius}
              onChange={toggleTempUnit}
              className={styles.toggleInput}
              id="myToggle"
            />
            <div className={styles.toggleFill}></div>
          </label>
          <p>{isCelsius ? "°C" : "°F"}</p>
        </div>
      </div>
      <p className={styles.appName}>SkyWatch</p>
    </header>
  );
}

export default Header;
