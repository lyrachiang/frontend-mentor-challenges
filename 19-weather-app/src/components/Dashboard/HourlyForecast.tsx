import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './styles/HourlyForecast.module.scss';

import DotBounceIcon from '@/assets/images/icons/icon-dot-bounce.svg?react';

import { type HourlyWeather } from '@/types';
import { getWeatherIcon } from '@/utils/image';
import Select from '@/components/Select';

const cx = classNames.bind(styles);

type HourlyItemProps = {
  time: string;
  temperature: number;
  weatherCode: number;
};

type HourlyForecastProps = {
  dailyDate: string[];
  isSuccess: boolean;
  data?: HourlyWeather;
};

const HourlyItem = (props: HourlyItemProps) => {
  const { time, temperature, weatherCode } = props;

  const getTime = (time: string) => {
    if (!time) {
      return '';
    }

    const date = new Date(time);

    return date.toLocaleTimeString('en-US', {
      hour: 'numeric'
    });
  };

  const weatherIcon = getWeatherIcon(weatherCode);

  return (
    <div className={cx('hourly-item')}>
      <div>
        <img
          className={cx('weather-icon')}
          src={weatherIcon?.icon}
          alt={weatherIcon?.alt}
        />
        <p className={cx('hourly-time')}>{getTime(time)}</p>
      </div>
      <p className={cx('hourly-temperature')}>{`${temperature}°`}</p>
    </div>
  );
};

const HourlyForecast = (props: HourlyForecastProps) => {
  const {
    dailyDate,
    isSuccess,
    data
  } = props;

  const [prevDailyDate, setPrevDailyDate] = useState(dailyDate);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return dailyDate.length > 0 ? dailyDate[0] : '';
  });

  if (dailyDate !== prevDailyDate) {
    setPrevDailyDate(dailyDate);
    setSelectedDate(dailyDate?.[0] || '');
  }

  const onChangeDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value);
  };

  const foundIdx = data?.time?.findIndex((date) => date.includes(selectedDate));
  const currentHourlyStartIdx = (typeof foundIdx !== 'undefined' && foundIdx !== -1) ? foundIdx : 0;
  const currentHourlyEndIdx = currentHourlyStartIdx !== -1 ? currentHourlyStartIdx + 24 : data?.time?.length;

  const currentHourlyDate = data?.time?.slice(currentHourlyStartIdx, currentHourlyEndIdx) || [];
  const currentHourlyTemperature = data?.temperature_2m?.slice(currentHourlyStartIdx, currentHourlyEndIdx) || [];
  const currentHourlyWeatherCode = data?.weather_code?.slice(currentHourlyStartIdx, currentHourlyEndIdx) || [];

  return (
    <section className={cx('hourly-forecast-container')}>
      <div className={cx('hourly-header')}>
        <h3 className={cx('hourly-title')}>Hourly forecast</h3>
        <Select
          value={selectedDate}
          dailyDate={dailyDate}
          onChangeDate={onChangeDate}
        />
      </div>
      <div className={cx('hourly-info')}>
        {isSuccess && currentHourlyDate.length > 0
          ? (currentHourlyDate.map((item, idx) => {
            return (
              <HourlyItem
                key={idx}
                time={item}
                temperature={currentHourlyTemperature?.[idx]}
                weatherCode={currentHourlyWeatherCode?.[idx]}
              />
            );
          }))
          : (Array.from({ length: 8 }, (_, idx) => {
            return (
              <div
                key={idx}
                className={cx('hourly-item-pending')}
              >
                <DotBounceIcon />
              </div>
            );
          }))
        }
      </div>
    </section>
  );
};

export default HourlyForecast;
