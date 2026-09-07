import classNames from 'classnames/bind';

import styles from './styles/Dashboard.module.scss';

import { type WeatherData } from '@/types';
import CurrentWeatherPanel from './CurrentWeatherPanel';
import DailyForecast from './DailyForecast';
import HourlyForecast from './HourlyForecast';

const cx = classNames.bind(styles);

type DashboardProps = {
  location: string;
  isSuccess: boolean;
  weatherData?: WeatherData;
};

const Dashboard = (props: DashboardProps) => {
  const {
    location,
    isSuccess,
    weatherData
  } = props;

  return (
    <div className={cx('dashboard-container')}>
      <div>
        <CurrentWeatherPanel
          location={location}
          isSuccess={isSuccess}
          data={weatherData?.current}
          units={weatherData?.current_units}
        />
        <DailyForecast
          isSuccess={isSuccess}
          data={weatherData?.daily}
        />
      </div>
      <HourlyForecast
        dailyDate={weatherData?.daily?.time || []}
        isSuccess={isSuccess}
        data={weatherData?.hourly}
      />
    </div>
  );
};

export default Dashboard;
