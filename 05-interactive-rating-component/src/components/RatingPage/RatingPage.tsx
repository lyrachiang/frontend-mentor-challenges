import classNames from 'classnames/bind';

import styles from './RatingPage.module.scss';

import Button from '@/components/Button';

import StarIcon from '@/assets/images/icons/icon-star.svg';

const cx = classNames.bind(styles);

type RatingPageProps = {
  selectedRating: number | null;
  onRatingClick: (value: number | null) => void;
  onSubmit?: () => void;
};

const RatingPage = (props: RatingPageProps) => {
  const { selectedRating, onRatingClick, onSubmit } = props;
  
  return (
    <section className={cx('rating-page-container')}>
      <div className={cx('rating-icon')}>
        <img src={StarIcon} alt='star' />
      </div>
      <h1 className={cx('rating-title')}>How did we do?</h1>
      <p className={cx('rating-content')}>Please let us know how we did with your support request. All feedback is appreciated to help us improve our offering!</p>
      <div className={cx('rating-state-block')}>
        {Array.from({ length: 5 }, (_, i) => {
          return (
            <Button
              key={i + 1}
              rounded={true}
              variant='rating'
              active={selectedRating === i + 1}
              onClick={() => onRatingClick(i + 1)}
            >
              {i + 1}
            </Button>
          );
        })}
      </div>
      <Button
        block={true}
        variant='primary'
        disabled={selectedRating === null}
        onClick={onSubmit}
      >
        Submit
      </Button>
    </section>
  );
};

export default RatingPage;
