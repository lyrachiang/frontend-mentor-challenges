import classNames from 'classnames/bind';

import styles from './Header.module.scss';

import MoonIcon from '@/assets/images/icons/icon-moon.svg?react';
import SunIcon from '@/assets/images/icons/icon-sun.svg?react';

import { useTheme } from '@/contexts/ThemeContext';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={cx('header-container')}>
      <h1 className={cx('title')}>Todo</h1>
      <Button
        icon={theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        variant='default'
        aria-label={`Switch theme to ${theme === 'dark' ? 'light' : 'dark'}`}
        onClick={toggleTheme}
      />
    </header>
  );
};

export default Header;
