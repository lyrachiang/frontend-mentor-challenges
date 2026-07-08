import classNames from 'classnames/bind';

import styles from './Progress.module.scss';

const cx = classNames.bind(styles);

type ProgressProps = {
  min: number;
  max: number;
  value: number;
};

const Progress = (props: ProgressProps) => {
  const { min, max, value } = props;

  const fillLength = value / max * 100;

  return (
    <div
      className={cx('progress-container')}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-label="Product Funding Summary"
    >
      <div className={cx('progress-fill')} style={{ width: `${fillLength}%` }}></div>
    </div>
  );
};

export default Progress;
