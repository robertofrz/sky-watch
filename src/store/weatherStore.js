import { create } from "zustand";

const useWeatherStore = create((set) => ({
  location: "london",
  setLocation: (newLocation) => set({ location: newLocation }),

  currentWeather: null,
  setCurrentWeather: (weather) => set({ currentWeather: weather }),

  isCelsius: true,
  toggleTemperatureUnit: () =>
    set((state) => ({ isCelsius: !state.isCelsius })),

  isMenuOpen: false,
  setIsMenuOpen: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));

export default useWeatherStore;
