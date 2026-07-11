import classNames from 'classnames/bind';

import styles from './Spending.module.scss';

import Chart from '@/components/Chart';

const cx = classNames.bind(styles);

const Spending = () => {
  return (
    <div className={cx('spending-container')}>
      <section className={cx('chart-section')}>
        <h1 className={cx('chart-title')}>Spending - Last 7 days</h1>
        <Chart />
      </section>
      <section className={cx('summary-section')}>
        <p className={cx('summary-title')}>Total this month</p>
        <div className={cx('summary-info')}>
          <p className={cx('summary-amount')}>$478.33</p>
          <div>
            <p className={cx('summary-rise')}>+2.4%</p>
            <p className={cx('summary-compare')}>from last month</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Spending;
