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

type SiderProps = {
  showMenu: boolean;
  onClickCloseMenuBtn: () => void;
};

const Sider = (props: SiderProps) => {
  const { showMenu, onClickCloseMenuBtn } = props;

  return (
    <aside className={cx('sider-container', { active: showMenu })}>
      <div className={cx('logo-block')}>
        <h1>
          <LogoIcon />
          <span className={cx('hidden')}>Maison Soleil</span>
        </h1>
        {showMenu && (
          <Button
            className={cx('close-menu-btn')}
            icon={<CloseIcon />}
            onClick={onClickCloseMenuBtn}
          /> 
        )}
      </div>
      <div className={cx('content-block')}>
        <ul className={cx('nav-list')}>
          <li>
            <Button
              icon={<BedIcon />}
              variant='nav'
              block={true}
              suffix='1'
              active={true}
            >
              Your stay
            </Button>
          </li>
          <li>
            <Button
              icon={<HouseIcon />}
              variant='nav'
              block={true}
            >
              The house
            </Button>
          </li>
          <li>
            <Button
              icon={<PinIcon />}
              variant='nav'
              block={true}
            >
              Around town
            </Button>
          </li>
          <li>
            <Button
              icon={<BreakfastIcon />}
              variant='nav'
              block={true}
            >
              Breakfast
            </Button>
          </li>
          <li>
            <Button
              icon={<MailIcon />}
              variant='nav'
              block={true}
            >
              Messages
            </Button>
          </li>
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
