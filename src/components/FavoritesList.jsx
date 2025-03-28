import useWeatherStore from "../store/weatherStore";
import { useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMultipleCitiesWeather } from "../services/api/fetchWeather";
import styles from "../styles/FavoritesList.module.css";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const isCelsius = useWeatherStore((state) => state.isCelsius);
  const setLocation = useWeatherStore((state) => state.setLocation);
  const setIsMenuOpen = useWeatherStore((state) => state.setIsMenuOpen);
  const inputRef = useRef(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["favoriteForecasts", favorites],
    queryFn: () => fetchMultipleCitiesWeather(favorites),
    enabled: favorites.length > 0,
  });

  function addCity() {
    const cityName = inputRef.current.value.trim().toLowerCase();

    if (cityName === "" || favorites.includes(cityName)) return;

    const newFavorites = [...favorites, cityName];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));

    inputRef.current.value = "";
  }

  function removeCity(city) {
    const newFavorites = favorites.filter((fav) => fav !== city.toLowerCase());
    setFavorites(newFavorites);

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  }

  function displayCityWeather(city) {
    setLocation(city);
    setIsMenuOpen(false);
  }

  if (isLoading) return <p>Loading your favorite cities...</p>;
  if (error) return <p>Error getting your favorite cities weather. {error}</p>;

  return (
    <aside className={styles.favoritesMenu}>
      <ul className={styles.favList}>
        {data &&
          data.map((city) => (
            <li
              key={`${city.location.lat},${city.location.lon}`}
              onClick={() => displayCityWeather(city.location.name)}
              className={styles.favCity}
            >
              <h2 className={styles.favCityName}>{city.location.name}</h2>
              <div className={styles.favCityWeather}>
                <img src={city.current.condition.icon} alt="weather icon" />
                <p className={styles.favTemp}>
                  {isCelsius ? city.current.temp_c : city.current.temp_f}°
                  {isCelsius ? "C" : "F"}
                </p>
              </div>
              <button
                onClick={() => removeCity(city.location.name)}
                className={styles.deleteBtn}
              >
                <img
                  className={styles.removeBtn}
                  src="./remove-icon.png"
                  alt="remove icon"
                />
              </button>
            </li>
          ))}
      </ul>
      <div className={styles.addCityContainer}>
        <input
          type="text"
          placeholder="Enter city"
          ref={inputRef}
          className={styles.searchInput}
        />
        <button className={styles.searchBtn} onClick={addCity}>
          Add City
        </button>
      </div>
    </aside>
  );
};

export default FavoritesList;
