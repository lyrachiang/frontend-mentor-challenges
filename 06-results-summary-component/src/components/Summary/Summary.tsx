import classNames from 'classnames/bind';

import styles from './Summary.module.scss';
import summaryData from '@/data/summary.json';

import SummaryItem from '@/components/SummaryItem';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

const Summary = () => {
  return (
    <section className={cx('summary-container')}>
      <h2 className={cx('summary-title')}>Summary</h2>
      <div className={cx('summary-list')}>
        {summaryData.map((item) => {
          return (
            <SummaryItem
              key={item.category}
              title={item.category}
              score={item.score}
              total={100}
            />
          );
        })}
      </div>
      <Button block={true}>Continue</Button>
    </section>
  );
};

export default Summary;
