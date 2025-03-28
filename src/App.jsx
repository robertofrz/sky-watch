import { useEffect } from "react";
import fetchWeather from "./services/api/fetchWeather";
import { useQuery } from "@tanstack/react-query";
import getGeolocation from "./services/api/getGeolocation";
import HomeScreen from "./pages/HomeScreen";
import useWeatherStore from "./store/weatherStore";

function App() {
  const location = useWeatherStore((state) => state.location);
  const setLocation = useWeatherStore((state) => state.setLocation);
  const setCurrentWeather = useWeatherStore((state) => state.setCurrentWeather);

  useEffect(() => {
    getGeolocation()
      .then((coords) => {
        setLocation(coords);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [setLocation]);

  const {
    data: currentWeather,
    isLoading: loadingCurrentWeather,
    error: currentError,
  } = useQuery({
    queryKey: location ? ["forecasts", location] : null,
    queryFn: () => fetchWeather(location),
    enabled: !!location,
  });

  useEffect(() => {
    if (currentWeather) {
      setCurrentWeather(currentWeather);
    }
  }, [currentWeather, setCurrentWeather]);

  if (!location) return <p>Getting location...</p>;
  if (loadingCurrentWeather) return <p>Loading current weather...</p>;
  if (currentError || !currentWeather)
    return <p>Error getting your current weather: {currentError}</p>;

  return (
    <div>
      <HomeScreen />
    </div>
  );
}

export default App;
