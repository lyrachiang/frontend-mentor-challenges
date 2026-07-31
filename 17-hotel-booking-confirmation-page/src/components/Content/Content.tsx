import classNames from 'classnames/bind';

import styles from './Content.module.scss';

import KeyIcon from '@/assets/images/icons/icon-key.svg?react';
import WifiIcon from '@/assets/images/icons/icon-wifi.svg?react';
import BreakfastIcon from '@/assets/images/icons/icon-breakfast.svg?react';
import SunImg from '@/assets/images/illustration-sun.svg';

import Button from '@/components/Button';
import { ReceiptCard, WelcomeCard, GuestInfoCard } from '@/components/Card';

const cx = classNames.bind(styles);

const Content = () => {
  return (
    <main className={cx('content-container')}>
      <div className={cx('main-block')}>
        <p className={cx('breadcrumb')}>
          Booking · Confirmed
        </p>
        <div className={cx('main-info')}>
          <p className={cx('title')}>Bienvenue, <span>Lucia.</span></p>
          <div className={cx('toolbar')}>
            <Button variant='primary'>Print receipt</Button>
            <Button variant='secondary'>Add to calendar</Button>
          </div>
        </div>
      </div>
      <div className={cx('booking-info-block')}>
        <div className={cx('booking-cards')}>
          <ReceiptCard />
          <div className={cx('img-sun')}>
            <img src={SunImg} alt='sun' />
            <span className={cx('hover-note')}>hover to fan</span>
          </div>
          <WelcomeCard />
        </div>
      </div>
      <div className={cx('guest-info-block')}>
        <GuestInfoCard
          icon={<KeyIcon />}
          id='01'
          category='arrival'
          title='Check-in from 15:00'
          desc='Sat, 25 April'
          note="Ring the brass bell by the blue door. If we're at the market, the key is in the terracotta pot by the olive tree."
        />
        <GuestInfoCard
          icon={<WifiIcon />}
          id='02'
          category='wifi'
          title='Le Soleil · Guest'
          desc='Password below'
        />
        <GuestInfoCard
          icon={<BreakfastIcon />}
          id='03'
          category='breakfast'
          title='Served 8 - 10:30'
          desc='On the terrace'
          note='Fresh figs, Marseille honey, pain au levain, and espresso. Gluten-free option? Leave a note the night before.'
        />
      </div>
    </main>
  );
};

export default Content;
