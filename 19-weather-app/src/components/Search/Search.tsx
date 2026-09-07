import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import styles from './Search.module.scss';

import SearchIcon from '@/assets/images/icons/icon-search.svg?react';
import LoadingIcon from '@/assets/images/icons/icon-loading.svg?react';

import { fetchCities } from '@/api/weather';
import { type City } from '@/types';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

type SearchDropdownProps = {
  ref: React.Ref<HTMLUListElement>;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  cities: City[];
  onSearchCity: (city: City) => void;
};

type SearchProps = {
  onSearchCity: (city: City) => void;
};

const SearchDropdown = (props: SearchDropdownProps) => {
  const {
    ref,
    isPending,
    isError,
    isSuccess,
    cities,
    onSearchCity
  } = props;

  if (!isPending && !isError && !isSuccess) {
    return null;
  }

  const getTitle = (city: City) => {
    let title = city.name;

    if (city?.admin1) {
      title += `, ${city.admin1}`;
    }

    if (city?.country) {
      title += `, ${city.country}`;
    }

    return title;
  };

  const handleSearchCity = (e: React.MouseEvent<HTMLAnchorElement>, city: City) => {
    e.preventDefault();
    onSearchCity(city);
  };

  return (
    <ul
      ref={ref}
      className={cx('search-dropdown')}
    >
      {isPending && (
        <li className={cx('msg', 'progress')}>
          <LoadingIcon />
          <span className={cx('title')}>Search in progress</span>
        </li>
      )}
      {isError && (
        <li className={cx('msg', 'error')}>
          <span className={cx('title')}>Search failed, please try again later</span>
        </li>
      )}
      {isSuccess && cities.length === 0 && (
        <li className={cx('msg')}>
          <span className={cx('title')}>No search result found</span>
        </li>
      )}
      {isSuccess && cities.map((city) => {
        return (
          <li
            key={city.id}
            className={cx('city-item')}
          >
            <a
              href="#"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleSearchCity(e, city)}
            >
              <img
                className={cx('country-flag')}
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${city.country_code}.svg`}
                alt={city.country}
              />
              <span className={cx('title')}>{getTitle(city)}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

const Search = (props: SearchProps) => {
  const { onSearchCity } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const isKeyboardTriggeredRef = useRef<boolean>(false);
  
  const [inputCity, setInputCity] = useState<string>('');
  const [showDropdownMenu, setShowDropdownMenu] = useState<boolean>(false);
  
  const queryClient = useQueryClient();
  const {
    data,
    isError,
    isPending,
    isSuccess,
    mutate,
    reset
  } = useMutation({
    mutationFn: fetchCities,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['weather', inputCity] })
  });

  useEffect(() => {
    if (!showDropdownMenu || !isKeyboardTriggeredRef.current) {
      return;
    }

    if (isSuccess && data?.results && data.results.length > 0) {
      const firstLink = dropdownRef.current?.querySelector('a');
      firstLink?.focus();
    }
  }, [showDropdownMenu, isSuccess, data]);

  useEffect(() => {
    if (!showDropdownMenu) {
      return;
    }

    const handlePointerdown = (e: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdownMenu(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerdown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerdown);
    };
  }, [showDropdownMenu]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showDropdownMenu) {
        setShowDropdownMenu(false);
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showDropdownMenu]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (value === '') {
      reset();
    }

    setInputCity(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      isKeyboardTriggeredRef.current = true;
    }

    if (e.key === 'Enter' && inputCity.trim()) {
      setShowDropdownMenu(true);
      mutate(inputCity);
    }
  };

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!inputCity) {
      return;
    }

    isKeyboardTriggeredRef.current = e.detail === 0;
    setShowDropdownMenu(true);
    mutate(inputCity);
  };

  const handleSearchCity = (city: City) => {
    onSearchCity(city);
    setInputCity('');
    reset();
  };

  return (
    <div className={cx('search-container')}>
      <div className={cx('search-block')}>
        <SearchIcon />
        <input
          ref={inputRef}
          type='search'
          name='searchInput'
          placeholder='Search for a city, e.g., New York'
          autoComplete='off'
          value={inputCity}
          onChange={handleChangeInput}
          onKeyDown={handleKeyDown}
        />
      </div>
      <Button
        className={cx('search-btn')}
        variant='primary'
        onClick={handleSearch}
      >
        Search
      </Button>
      {showDropdownMenu && (
        <SearchDropdown
          ref={dropdownRef}
          isPending={isPending}
          isError={isError}
          isSuccess={isSuccess}
          cities={data?.results || []}
          onSearchCity={handleSearchCity}
        />
      )}
    </div>
  );
};

export default Search;
