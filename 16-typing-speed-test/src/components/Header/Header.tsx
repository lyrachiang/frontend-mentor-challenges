import classNames from 'classnames/bind';

import styles from './Header.module.scss';

import LogoIcon from '@/assets/images/icons/icon-logo-small.svg?react';
import PersonalBestIcon from '@/assets/images/icons/icon-personal-best.svg?react';

const cx = classNames.bind(styles);

type HeaderProps = {
  bestWpm?: number | null;
};

const Header = (props: HeaderProps) => {
  const { bestWpm } = props;

  return (
    <header className={cx('header-container')}>
      <div className={cx('logo-container')}>
        <LogoIcon />
        <div className={cx('logo-info')}>
          <h1 className={cx('title')}>Typing Speed Test</h1>
          <p className={cx('desc')}>Type as fast as you can in 60 seconds</p>
        </div>
      </div>
      <div className={cx('personal-info')}>
        <PersonalBestIcon />
        <span className={cx('title', 'desktop')}>Personal best:</span>
        <span className={cx('title', 'mobile')}>Best:</span>
        <span className={cx('desc')}>{typeof bestWpm === 'number' ? `${bestWpm} WPM` : '--'}</span>
      </div>
    </header>
  );
};

export default Header;
