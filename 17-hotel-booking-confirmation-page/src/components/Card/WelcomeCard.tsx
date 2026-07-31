import classNames from 'classnames/bind';

import styles from './styles/WelcomeCard.module.scss';

const cx = classNames.bind(styles);

const WelcomeCard = () => {
  return (
    <div className={cx('welcome-card-container')}>
      <div className={cx('card-header')}>
        <p>Welcome Card</p>
      </div>
      <div className={cx('card-content')}>
        <p>
          <span className={cx('title')}>A note from your host,</span>
          <span className={cx('name')}>Margaux.</span>
        </p>
        <p >We're so glad you're coming. The shutters will be open, the lemonade cold, and the cat - Poivre - pretending not to notice you.</p>
      </div>
      <div className={cx('card-footer')}>
        <p className={cx('title')}>Room</p>
        <p className={cx('name')}>La Garrigue</p>
      </div>
    </div>
  );
};

export default WelcomeCard;
