import classNames from 'classnames/bind';

import styles from './styles/Stats.module.scss';

import { type Status } from '@/types';

const cx = classNames.bind(styles);

type StatsProps = {
  status: Status;
  wpm: number;
  accuracy: number;
  time: number;
  mode: string;
};

const Stats = (props: StatsProps) => {
  const { status, wpm, accuracy, time, mode } = props;

  const getFormatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const minsFormat = mins.toString().padStart(2, '0');
    const secsFormat = secs.toString().padStart(2, '0');

    if (hours > 0) {
      return `${hours}:${minsFormat}:${secsFormat}`;
    }

    return `${mins}:${secsFormat}`;
  };

  const getFormatCountdown = (seconds: number) => {
    return `0:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cx('stats-container')}>
      <div>
        <p className={cx('stats-title')}>WPM:</p>
        <p className={cx('stats-value')}>{wpm}</p>
      </div>
      <div>
        <p className={cx('stats-title')}>Accuracy:</p>
        <p className={cx('stats-value', (accuracy < 100 ? 'incorrect' : ''))}>{`${accuracy}%`}</p>
      </div>
      <div>
        <p className={cx('stats-title')}>Time:</p>
        <p className={cx('stats-value', (status === 'starting' ? 'staring' : ''))}>{mode === 'timed' ? getFormatCountdown(time) : getFormatTime(time)}</p>
      </div>
    </div>
  );
};

export default Stats;
