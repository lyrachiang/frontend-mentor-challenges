import classNames from 'classnames/bind';

import styles from './Header.module.scss';

import LogoIcon from '@/assets/images/logo.svg?react';
import MenuIcon from '@/assets/images/icons/icon-menu.svg?react';

import Button from '@/components/Button';

const cx = classNames.bind(styles);

type HeaderProps = {
  showMenu: boolean;
  menuBtnRef: React.RefObject<HTMLButtonElement | null>;
  onClickMenuBtn: () => void;
};

const Header = (props: HeaderProps) => {
  const {
    showMenu,
    menuBtnRef,
    onClickMenuBtn
  } = props;

  return (
    <header className={cx('header-container')}>
      <a href="#">
        <LogoIcon />
      </a>
      <Button
        ref={menuBtnRef}
        className={cx('menu-btn')}
        icon={<MenuIcon />}
        onClick={onClickMenuBtn}
        aria-expanded={showMenu}
        aria-controls='siderMenu'
      />
    </header>
  );
};

export default Header;
