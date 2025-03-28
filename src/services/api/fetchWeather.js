import axios from "axios";

export default async function fetchWeather(location) {
  try {
    const query =
      typeof location === "string"
        ? location
        : `${location.latitude}, ${location.longitude}`;

    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=54c3c60d4f234ae8b64180553252303&q=${query}&days=7&aqi=no&alerts=no`
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(`Something went wrong ${error}`);
  }
}
export async function fetchMultipleCitiesWeather(cities) {
  try {
    const weatherData = await Promise.all(
      cities.map((city) => fetchWeather(city))
    );
    return weatherData;
  } catch (error) {
    throw new Error(
      "Got an error when getting data for the favorites cities." + { error }
    );
  }
}
