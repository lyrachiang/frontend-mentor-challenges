import classNames from 'classnames/bind';

import styles from './styles/DailyForecast.module.scss';

import DotBounceIcon from '@/assets/images/icons/icon-dot-bounce.svg?react';

import { type DailyWeather } from '@/types';
import { getWeatherIcon } from '@/utils/image';

const cx = classNames.bind(styles);

type DailyItemProps = {
  time: string;
  max: number;
  min: number;
  weatherCode: number;
};

type DailyForecastProps = {
  isSuccess: boolean;
  data?: DailyWeather;
};

const DailyItem = (props: DailyItemProps) => {
  const { time, max, min, weatherCode } = props;

  const getWeekday = (time: string) => {
    if (!time) {
      return '';
    }

    const date = new Date(time);
    
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const weatherIcon = getWeatherIcon(weatherCode);

  return (
    <div className={cx('daily-item')}>
      <p className={cx('daily-weekday')}>{getWeekday(time)}</p>
      <img
        className={cx('weather-icon')}
        src={weatherIcon?.icon}
        alt={weatherIcon?.alt}
      />
      <p className={cx('temperature-range')}>
        <span>{`${max}°`}</span>
        <span>{`${min}°`}</span>
      </p>
    </div>
  );
};

const DailyForecast = (props: DailyForecastProps) => {
  const {
    isSuccess,
    data
  } = props;

  return (
    <div className={cx('daily-forecast-container')}>
      <p className={cx('daily-title')}>Daily forecast</p>
      <div className={cx('daily-info')}>
        {isSuccess && data?.time?.length === 7
          ? (data?.time.map((item, idx) => {
            return (
              <DailyItem
                key={idx}
                time={item}
                max={data?.temperature_2m_max?.[idx]}
                min={data?.temperature_2m_min?.[idx]}
                weatherCode={data?.weather_code?.[idx]}
              />
            );
          }))
          : (Array.from({ length: 7 }, (_, idx) => {
            return (
              <div
                key={idx}
                className={cx('daily-item-pending')}
              >
                <DotBounceIcon />
              </div>
            );
          }))
        }
      </div>
    </div>
  );
};

export default DailyForecast;
