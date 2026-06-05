import classNames from 'classnames/bind';

import styles from './Header.module.scss';

import { useTheme } from '@/contexts/ThemeContext';
import Button from '@/components/Button';

import LogoIcon from '@/assets/images/icons/logo.svg?react';
import SunIcon from '@/assets/images/icons/icon-sun.svg?react';
import MoonIcon from '@/assets/images/icons/icon-moon.svg?react';

const cx = classNames.bind(styles);

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={cx('header-container')}>
      <LogoIcon />
      <Button
        className={cx('btn-theme')}
        icon={theme === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleTheme}
      />
    </header>
  );
};

export default Header;
