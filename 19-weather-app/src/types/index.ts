export type City = {
  id: number;
  name: string;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
  timezone: string;
  admin1?: string;
};

export type CurrentWeather = {
  interval: string;
  precipitation: number;
  relative_humidity_2m: number;
  temperature_2m: number;
  apparent_temperature: number;
  time: string;
  weather_code: number;
  wind_speed_10m: number;
};

export type CurrentWeatherUnits = {
  interval: string;
  precipitation: string;
  relative_humidity_2m: string;
  temperature_2m: string;
  apparent_temperature: string;
  time: string;
  weather_code: string;
  wind_speed_10m: string;
};

export type DailyWeather = {
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: string[];
  weather_code: number[];
};

export type HourlyWeather = {
  temperature_2m: number[];
  time: string[];
  weather_code: number[];
};

export type WeatherData = {
  current: CurrentWeather;
  current_units: CurrentWeatherUnits;
  daily: DailyWeather;
  hourly: HourlyWeather;
};
