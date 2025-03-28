//
export default function getGeolocation() {
  return new Promise((resolve, reject) => {
    const options = {
      maximumAge: 0,
      enableHighAccuracy: false,
      timeout: 10000,
    };

    const success = (pos) => {
      const coords = pos.coords;
      resolve(coords);
    };

    const error = (err) => {
      reject("Erro ao obter localização: " + err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  });
}
