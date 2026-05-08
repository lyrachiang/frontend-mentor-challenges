import classNames from 'classnames/bind';

import styles from './Result.module.scss';

const cx = classNames.bind(styles);

const Result = () => {
  return (
    <section className={cx('result-container')}>
      <h1 className={cx('result-title')}>Your Result</h1>
      <div className={cx('result-score')}>
        <p className={cx('final-score')}>76</p>
        <p className={cx('total-score')}>of 100</p>
      </div>
      <p className={cx('result-comment')}>Great</p>
      <p className={cx('result-content')}>You scored higher than 65% of the people who have taken these tests.</p>
    </section>
  );
};

export default Result;
