import classNames from 'classnames/bind';

import styles from './Header.module.scss';

import LogoIcon from '@/assets/images/logo.svg?react';
import MenuIcon from '@/assets/images/icons/icon-menu.svg?react';

import Button from '@/components/Button';

const cx = classNames.bind(styles);

type HeaderProps = {
  onClickMenuBtn: () => void;
};

const Header = (props: HeaderProps) => {
  const { onClickMenuBtn } = props;

  return (
    <header className={cx('header-container')}>
      <LogoIcon />
      <Button
        className={cx('menu-btn')}
        icon={<MenuIcon />}
        onClick={onClickMenuBtn}
      />
    </header>
  );
};

export default Header;
