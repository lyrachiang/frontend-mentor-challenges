import classNames from 'classnames/bind';

import styles from './styles/CurrentWeatherPanel.module.scss';

import DotBounceIcon from '@/assets/images/icons/icon-dot-bounce.svg?react';

import {
  type CurrentWeather,
  type CurrentWeatherUnits
} from '@/types';
import { getWeatherIcon } from '@/utils/image';

const cx = classNames.bind(styles);

type CurrentWeatherPanelProps = {
  location: string;
  isSuccess: boolean;
  data?: CurrentWeather;
  units?: CurrentWeatherUnits;
};

const CurrentWeatherPanel = (props: CurrentWeatherPanelProps) => {
  const {
    location,
    isSuccess,
    data,
    units
  } = props;

  const time = data?.time || '';
  const weatherCode = typeof data?.weather_code !== 'undefined' ? data.weather_code : null;

  let temperature = '';
  let apparentTemperature = '-';
  let humidity = '-';
  let wind = '-';
  let precipitation = '-';

  if (isSuccess) {
    if (typeof data?.temperature_2m !== 'undefined' && typeof units?.temperature_2m !== 'undefined') {
      temperature = `${data.temperature_2m}°`;
    }

    if (typeof data?.apparent_temperature !== 'undefined' && typeof units?.apparent_temperature !== 'undefined') {
      apparentTemperature = `${data.apparent_temperature}°`;
    }

    if (typeof data?.relative_humidity_2m !== 'undefined' && typeof units?.relative_humidity_2m !== 'undefined') {
      humidity = `${data.relative_humidity_2m}${units.relative_humidity_2m}`;
    }

    if (typeof data?.wind_speed_10m !== 'undefined' && typeof units?.wind_speed_10m !== 'undefined') {
      wind = `${data.wind_speed_10m} ${units.wind_speed_10m === 'mp/h' ? 'mph' : units.wind_speed_10m}`;
    }

    if (typeof data?.precipitation !== 'undefined' && typeof units?.precipitation !== 'undefined') {
      precipitation = `${data.precipitation} ${units.precipitation === 'inch' ? 'in' : units.precipitation}`;
    }
  }

  const weatherIcon = getWeatherIcon(weatherCode);

  const getToday = (time: string) => {
    if (!time) {
      return '';
    }

    const date = new Date(time);
    
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={cx('current-weather-panel-container')}>
      {(location && time && temperature)
        ? (
          <div className={cx('current-weather')}>
            <div>
              <p className={cx('location')}>{location}</p>
              <p className={cx('time')}>{getToday(time)}</p>
            </div>
            <div>
              {weatherIcon !== null && (
                <img
                  className={cx('weather-icon')}
                  src={weatherIcon?.icon}
                  alt={weatherIcon?.alt}
                />
              )}
              <span className={cx('temperature')}>{temperature}</span>
            </div>
          </div>
        )
        : (
          <div className={cx('current-weather-loading')}>
            <DotBounceIcon />
            <p>Loading...</p>
          </div>
        )
      }
      <div className={cx('other-info')}>
        <div>
          <p className={cx('title')}>Feels Like</p>
          <p className={cx('value')}>{apparentTemperature}</p>
        </div>
        <div>
          <p className={cx('title')}>Humidity</p>
          <p className={cx('value')}>{humidity}</p>
        </div>
        <div>
          <p className={cx('title')}>Wind</p>
          <p className={cx('value')}>{wind}</p>
        </div>
        <div>
          <p className={cx('title')}>Precipitation</p>
          <p className={cx('value')}>{precipitation}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherPanel;
