import classNames from 'classnames/bind';

import styles from './styles/ProductFundingSummary.module.scss';

import { useReward } from '@/contexts/RewardContext';
import Progress from '@/components/Progress';

const cx = classNames.bind(styles);

const ProductFundingSummary = () => {
  const { totalAmount, totalBackers } = useReward();

  return (
    <section className={cx('product-funding-summary-container')}>
      <div className={cx('funding-info')}>
        <div>
          <p className={cx('funding-title')}>{`$${totalAmount.toLocaleString()}`}</p>
          <p className={cx('funding-desc')}>of $100,000 backed</p>
        </div>
        <div>
          <p className={cx('funding-title')}>{totalBackers.toLocaleString()}</p>
          <p className={cx('funding-desc')}>total backers</p>
        </div>
        <div>
          <p className={cx('funding-title')}>56</p>
          <p className={cx('funding-desc')}>days left</p>
        </div>
      </div>
      <Progress
        min={0}
        max={100000}
        value={totalAmount}
      />
    </section>
  );
};

export default ProductFundingSummary;
