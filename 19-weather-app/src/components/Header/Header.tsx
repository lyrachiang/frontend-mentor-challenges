import classNames from 'classnames/bind';

import styles from './Header.module.scss';

import LogoIcon from '@/assets/images/logo.svg?react';

import Dropdown from '@/components/Dropdown';

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <header className={cx('header-container')}>
      <h1 className={cx('logo')}>
        <LogoIcon />
        <span className={cx('hidden')}>Weather Now</span>
      </h1>
      <Dropdown />
    </header>
  );
};

export default Header;
