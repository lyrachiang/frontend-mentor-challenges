import classNames from 'classnames/bind';

import styles from './RatingCompletePage.module.scss';

import ThankSvg from '@/assets/images/illustration-thank-you.svg';

const cx = classNames.bind(styles);

type RatingCompletePageProps = {
  selectedRating: number | null;
};

const RatingCompletePage = (props: RatingCompletePageProps) => {
  const { selectedRating } = props;

  return (
    <div className={cx('rating-complete-container')}>
      <img className={cx('complete-img')} src={ThankSvg} alt='thank-you-img' />
      <p className={cx('complete-state')}>{`You selected ${selectedRating} out of 5`}</p>
      <h1 className={cx('complete-title')}>Thank you!</h1>
      <p className={cx('complete-content')}>We appreciate you taking the time to give a rating. If you ever need more support, don't hesitate to get in touch!</p>
    </div>
  );
};

export default RatingCompletePage;
