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

type SearchDropdownMsgProps = {
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  cities: City[];
};

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

const SearchDropdownMsg = (props: SearchDropdownMsgProps) => {
  const {
    isPending,
    isError,
    isSuccess,
    cities
  } = props;

  return (
    <div
      className={cx('search-dropdown-msg', { progress: isPending, error: isError })}
      aria-live='polite'
    >
      {isPending && (
        <>
          <LoadingIcon />
          <span className={cx('title')}>Search in progress</span>
        </>
      )}
      {isError && (
        <span className={cx('title')}>Search failed, please try again later</span>
      )}
      {isSuccess && cities.length === 0 && (
        <span className={cx('title')}>No search result found</span>
      )}
    </div>
  );
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

  const handleSearchCity = (e: React.MouseEvent<HTMLButtonElement>, city: City) => {
    e.preventDefault();
    onSearchCity(city);
  };

  if (isPending
    || isError
    || (isSuccess && cities.length === 0)
  ) {
    return (
      <SearchDropdownMsg
        isPending={isPending}
        isError={isError}
        isSuccess={isSuccess}
        cities={cities}
      />
    );
  }

  return (
    <ul
      id='cityResults'
      role='listbox'
      ref={ref}
      className={cx('search-dropdown')}
    >
      {cities.map((city) => {
        return (
          <li
            key={city.id}
            className={cx('city-item')}
            role='option'
          >
            <Button
              variant='search'
              block={true}
              icon={
                <img
                  className={cx('country-flag')}
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${city.country_code}.svg`}
                  alt={city.country}
                />
              }
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSearchCity(e, city)}
            >
              {getTitle(city)}
            </Button>
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
      const firstLink = dropdownRef.current?.querySelector('button');
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
        <label htmlFor='searchInput' className={cx('visually-hidden')}>
          Search for a city
        </label>
        <input
          id='searchInput'
          ref={inputRef}
          type='search'
          name='searchInput'
          placeholder='Search for a city, e.g., New York'
          autoComplete='off'
          value={inputCity}
          onChange={handleChangeInput}
          onKeyDown={handleKeyDown}
          role='combobox'
          aria-expanded={showDropdownMenu}
          aria-controls='cityResults'
          aria-autocomplete='list'
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
