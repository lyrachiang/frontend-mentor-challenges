import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './App.module.scss';

import RatingPage from '@/components/RatingPage';
import RatingCompletePage from '@/components/RatingCompletePage';
import Footer from '@/components/Footer';

const cx = classNames.bind(styles);

const App = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const onRatingClick = (value: number | null) => {
    setSelectedRating(selectedRating === value ? null : value);
  };

  const onRatingSubmit = () => {
    if (selectedRating === null) return;
    setIsSubmitted(true);
  };

  return (
    <div className={cx('app-container')}>
      <main className={cx('main-container')}>
        {isSubmitted
          ? (
            <RatingCompletePage
              selectedRating={selectedRating}
            />
          )
          : (
            <RatingPage
              selectedRating={selectedRating}
              onRatingClick={onRatingClick}
              onSubmit={onRatingSubmit}
            />
          )
        }
      </main>
      <Footer />
    </div>
  );
};

export default App;
