import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Header.module.scss';

import HamburgerIcon from '@/assets/images/icons/icon-hamburger.svg?react';
import CloseMenuIcon from '@/assets/images/icons/icon-close-menu.svg?react';
import Logo from '@/assets/images/icons/icon-logo.svg';

const cx = classNames.bind(styles);

const Header = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    if (!showMenu) {
      return;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [showMenu]);

  return (
    <header className={cx('header-container')}>
      <img src={Logo} alt="crowdfund" />
      <ul className={cx('desktop-menu-container')}>
        <li><a href="#">About</a></li>
        <li><a href="#">Discover</a></li>
        <li><a href="#">Get Started</a></li>
      </ul>
      <div className={cx('mobile-menu-container')}>
        {showMenu
          ? (
            <>
              <div className={cx('menu-mask')}></div>
              <CloseMenuIcon className={cx('menu-icon')} onClick={() => setShowMenu(false)} />
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Discover</a></li>
                <li><a href="#">Get Started</a></li>
              </ul>
            </>
          )
          : (<HamburgerIcon className={cx('menu-icon')} onClick={() => setShowMenu(true)} />)
        }
      </div>
    </header>
  );
};

export default Header;
