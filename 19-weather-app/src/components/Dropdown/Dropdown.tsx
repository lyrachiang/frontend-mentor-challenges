import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './Dropdown.module.scss';

import UnitsIcon from '@/assets/images/icons/icon-units.svg?react';
import DropdownIcon from '@/assets/images/icons/icon-dropdown.svg?react';

import { useUnit } from '@/contexts/UnitContext';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

const Dropdown = () => {
  const { unit, switchUnit } = useUnit();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);

  const [showDropdownMenu, setShowDropdownMenu] = useState<boolean>(false);

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
        dropdownButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showDropdownMenu]);

  const onClickDropdownBtn = () => {
    setShowDropdownMenu(prev => !prev);
  };

  const handleSwitchUnit = () => {
    switchUnit();
    setShowDropdownMenu(false);
    dropdownButtonRef.current?.focus();
  };

  return (
    <div
      ref={dropdownRef}
      className={cx('dropdown-container')}
    >
      <Button
        ref={dropdownButtonRef}
        icon={<UnitsIcon />}
        suffixIcon={<DropdownIcon />}
        variant='default'
        aria-haspopup='true'
        aria-expanded={showDropdownMenu}
        aria-controls='dropdownMenu'
        onClick={onClickDropdownBtn}
      >
        Units
      </Button>
      {showDropdownMenu && (
        <div
          id='dropdownMenu'
          className={cx('dropdown-content')}
        >
          <Button
            className={cx('switch-btn')}
            variant='default'
            block={true}
            onClick={handleSwitchUnit}
          >
            {`Switch to ${unit === 'metric' ? 'Imperial' : 'Metric'}`}
          </Button>
          <ul className={cx('dropdown-list')}>
            <li>
              <div className={cx('title')}>Temperature</div>
              <ul>
                <li className={cx('unit', { active: unit === 'metric' })}>Celsius (°C)</li>
                <li className={cx('unit', { active: unit === 'imperial' })}>Fahrenheit (°F)</li>
              </ul>
            </li>
            <li>
              <div className={cx('title')}>Wind Speed</div>
              <ul>
                <li className={cx('unit', { active: unit === 'metric' })}>km/h</li>
                <li className={cx('unit', { active: unit === 'imperial' })}>mph</li>
              </ul>
            </li>
            <li>
              <div className={cx('title')}>Precipitation</div>
              <ul>
                <li className={cx('unit', { active: unit === 'metric' })}>Millimeters (mm)</li>
                <li className={cx('unit', { active: unit === 'imperial' })}>Inches (in)</li>
              </ul>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
