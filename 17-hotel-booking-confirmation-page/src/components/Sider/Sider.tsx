import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './Sider.module.scss';

import LogoIcon from '@/assets/images/logo.svg?react';
import BedIcon from '@/assets/images/icons/icon-bed.svg?react';
import HouseIcon from '@/assets/images/icons/icon-house.svg?react';
import PinIcon from '@/assets/images/icons/icon-pin.svg?react';
import BreakfastIcon from '@/assets/images/icons/icon-breakfast-outline.svg?react';
import MailIcon from '@/assets/images/icons/icon-mail.svg?react';
import CloseIcon from '@/assets/images/icons/icon-close.svg?react';

import Button from '@/components/Button';

const cx = classNames.bind(styles);

const menuList = [
  { id: '1', title: 'Your stay', icon: <BedIcon />, link: '#your-stay', notify: 1, active: true },
  { id: '2', title: 'The house', icon: <HouseIcon />, link: '#the-house', notify: 0, active: false },
  { id: '3', title: 'Around town', icon: <PinIcon />, link: '#around-town', notify: 0, active: false },
  { id: '4', title: 'Breakfast', icon: <BreakfastIcon />, link: '#breakfast', notify: 0, active: false },
  { id: '5', title: 'Messages', icon: <MailIcon />, link: '#messages', notify: 0, active: false }
];

type MenuItemProps = {
  title: string;
  icon: React.ReactNode;
  link: string;
  notify: number;
  active: boolean;
  onClick: () => void;
};

type SiderProps = {
  showMenu: boolean;
  openedMenuByKeyboardRef: React.RefObject<boolean>;
  onClickCloseMenuBtn: () => void;
  onClickMenuItem: () => void;
};

const MenuItem = (props: MenuItemProps) => {
  const { title, icon, link, notify, active, onClick } = props;

  return (
    <li>
      <a
        className={cx('menu-item', { active })}
        href={link}
        onClick={onClick}
      >
        <span className={cx('menu-icon')}>{icon}</span>
        <span className={cx('menu-title')}>{title}</span>
        {notify > 0 && (<span className={cx('menu-notify')}>{notify}</span>)}
      </a>
    </li>
  );
};

const Sider = (props: SiderProps) => {
  const {
    showMenu,
    openedMenuByKeyboardRef,
    onClickCloseMenuBtn,
    onClickMenuItem
  } = props;

  const asideRef = useRef<HTMLElement>(null);
  const closeMenuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (showMenu && openedMenuByKeyboardRef?.current) {
      closeMenuBtnRef.current?.focus();
    }
  }, [showMenu, openedMenuByKeyboardRef]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !showMenu) {
      return;
    }

    const focusableEls = asideRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]');

    if (!focusableEls || focusableEls.length === 0) {
      return;
    }

    const firstItem = focusableEls[0];
    const lastItem = focusableEls[focusableEls.length - 1];

    if (!e.shiftKey && document.activeElement === lastItem) {
      e.preventDefault();
      firstItem?.focus();
    } else if (e.shiftKey && document.activeElement === firstItem) {
      e.preventDefault();
      lastItem?.focus();
    }
  };

  return (
    <aside
      id='siderMenu'
      ref={asideRef}
      className={cx('sider-container', { active: showMenu })}
      onKeyDown={handleKeyDown}
    >
      <div className={cx('logo-block')}>
        <h1>
          <a href="#">
            <LogoIcon />
            <span className={cx('hidden')}>Maison Soleil</span>
          </a>
        </h1>
        {showMenu && (
          <Button
            ref={closeMenuBtnRef}
            className={cx('close-menu-btn')}
            icon={<CloseIcon />}
            onClick={onClickCloseMenuBtn}
          /> 
        )}
      </div>
      <div className={cx('content-block')}>
        <ul className={cx('nav-list')}>
          {menuList.map((item) => {
            return (
              <MenuItem
                key={item.id}
                title={item.title}
                icon={item.icon}
                link={item.link}
                notify={item.notify}
                active={item.active}
                onClick={onClickMenuItem}
              />
            );
          })}
        </ul>
        <div className={cx('local-weather-info')}>
          <p>Today in Cassis</p>
          <p className={cx('temperature')}>27°</p>
          <p>Sunny · light breeze</p>
        </div>
      </div>
      <div className={cx('info-block')}>
        <p>Est. 1987</p>
        <p>Maison Soleil · 12 Rue des Oliviers · Cassis</p>
        <p>© 2026 Maison Soleil</p>
      </div>
    </aside>
  );
};

export default Sider;
