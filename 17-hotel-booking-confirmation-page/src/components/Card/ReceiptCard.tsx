import {
  type HTMLAttributes,
  type Ref
} from 'react';
import classNames from 'classnames/bind';

import styles from './styles/ReceiptCard.module.scss';

import BarcodeIcon from '@/assets/images/icons/icon-barcode.svg?react';

const cx = classNames.bind(styles);

type ReceiptCardProps = HTMLAttributes<HTMLDivElement> & {
  ref?: Ref<HTMLDivElement>;
};

const ReceiptCard = (props: ReceiptCardProps) => {
  const { ref } = props;

  return (
    <div className={cx('receipt-card-container')} ref={ref}>
      <div className={cx('card-header')}>
        <div>
          <p>Receipt</p>
          <p className={cx('title')}>Your stay</p>
        </div>
        <div>
          <p>№ MS-2026</p>
          <p>0421-AH</p>
        </div>
      </div>
      <div className={cx('check-info')}>
        <div>
          <p className={cx('title')}>Check in</p>
          <p className={cx('date')}>25 Apr</p>
          <p className={cx('time')}>Saturday · 15:00</p>
        </div>
        <div>
          <p className={cx('title')}>Check out</p>
          <p className={cx('date')}>29 Apr</p>
          <p className={cx('time')}>Wednesday · 11:00</p>
        </div>
      </div>
      <div className={cx('order-info')}>
        <p>
          <span>Room · La Garrigue · 4 nights</span>
          <span>€ 620.00</span>
        </p>
        <p>
          <span>Breakfast · 2 guests</span>
          <span>€ 96.00</span>
        </p>
        <p>
          <span>Tourist tax</span>
          <span>€ 14.40</span>
        </p>
      </div>
      <div className={cx('total-paid')}>
        <p className={cx('title')}>Total paid</p>
        <p className={cx('value')}>€ 730.40</p>
      </div>
      <div className={cx('card-footer')}>
        <p>Paid · Wise · GBP</p>
        <BarcodeIcon />
      </div>
    </div>
  );
};

export default ReceiptCard;
