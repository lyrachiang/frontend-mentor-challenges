export const fetchCities = async(name: string) => {
  const reqData = {
    name,
    count: '10',
    language: 'en',
    format: 'json'
  };
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${new URLSearchParams(reqData).toString()}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return await response.json();
};

export const fetchWeatherByCoordinates = async({ latitude, longitude, unit }: { latitude: number, longitude: number, unit: string }) => {
  const reqData = {
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    hourly: 'weather_code,temperature_2m',
    current: 'temperature_2m,apparent_temperature,precipitation,weather_code,relative_humidity_2m,wind_speed_10m',
    wind_speed_unit: unit === 'metric' ? 'kmh' : 'mph',
    temperature_unit: unit === 'metric' ? 'celsius' : 'fahrenheit',
    precipitation_unit: unit === 'metric' ? 'mm' : 'inch',
    timezone: 'auto'
  };
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${new URLSearchParams(reqData).toString()}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return await response.json();
};
