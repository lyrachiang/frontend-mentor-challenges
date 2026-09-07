import { useState } from 'react';
import classNames from 'classnames/bind';
import { useQuery } from '@tanstack/react-query';

import styles from './App.module.scss';

import { fetchWeatherByCoordinates } from '@/api/weather';
import { useUnit } from '@/contexts/UnitContext';
import { type City } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ConnectionFailed, Hero } from '@/components/Pages';
import Dashboard from '@/components/Dashboard';

const cx = classNames.bind(styles);

type SelectedLocation = {
  name: string;
  latitude: number;
  longitude: number;
};

const App = () => {
  const { unit } = useUnit();

  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation>({
    name: 'Berlin, Germany',
    latitude: 52.52,
    longitude: 13.41
  });

  const {
    data: weatherData,
    isError,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['weather', selectedLocation.latitude, selectedLocation.longitude, unit],
    queryFn: () => fetchWeatherByCoordinates({
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      unit
    })
  });

  const getLocationLabel = (city: City) => {
    let response = city.name;

    if (city?.country) {
      response += `, ${city.country}`;
    }

    return response;
  };

  const handleSearchCity = (city: City) => {
    setSelectedLocation({
      name: getLocationLabel(city),
      latitude: city.latitude,
      longitude: city.longitude
    });
  };

  return (
    <div className={cx('app-container')}>
      <Header />
      <main className={cx('main-container')}>
        {isError
          ? (
            <ConnectionFailed onRetryConnect={refetch} />
          )
          : (
            <>
              <Hero onSearchCity={handleSearchCity} />
              <Dashboard
                location={selectedLocation?.name}
                isSuccess={isSuccess}
                weatherData={weatherData}
              />
            </>
          )
        }
      </main>
      <Footer />
    </div>
  );
};

export default App;
