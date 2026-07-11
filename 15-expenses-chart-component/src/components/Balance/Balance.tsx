import classNames from 'classnames/bind';

import styles from './Balance.module.scss';

import LogoIcon from '@/assets/images/icons/logo.svg?react';

const cx = classNames.bind(styles);

const Balance = () => {
  return (
    <section className={cx('balance-container')}>
      <div>
        <p className={cx('title')}>My balance</p>
        <p className={cx('amount')}>$921.48</p>
      </div>
      <LogoIcon />
    </section>
  );
};

export default Balance;
