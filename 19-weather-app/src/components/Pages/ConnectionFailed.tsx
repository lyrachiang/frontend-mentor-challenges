import classNames from 'classnames/bind';

import styles from './styles/ConnectionFailed.module.scss';

import ErrorIcon from '@/assets/images/icons/icon-error.svg?react';
import RetryIcon from '@/assets/images/icons/icon-retry.svg?react';

import Button from '@/components/Button';

const cx = classNames.bind(styles);

type ConnectionFailedProps = {
  onRetryConnect: () => void;
};

const ConnectionFailed = (props: ConnectionFailedProps) => {
  const { onRetryConnect } = props;

  return (
    <div className={cx('connection-failed-page')}>
      <ErrorIcon className={cx('error-icon')} />
      <h2 className={cx('title')}>Something went wrong</h2>
      <p className={cx('desc')}>We couldn't connect to the server (API error). Please try again in a few moments.</p>
      <Button
        className={cx('retry-btn')}
        icon={<RetryIcon />}
        variant='default'
        onClick={onRetryConnect}
      >
        Retry
      </Button>
    </div>
  );
};

export default ConnectionFailed;
