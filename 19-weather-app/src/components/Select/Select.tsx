import classNames from 'classnames/bind';

import styles from './Select.module.scss';

const cx = classNames.bind(styles);

type SelectProps = {
  value: string;
  dailyDate: string[];
  onChangeDate: React.ChangeEventHandler<HTMLSelectElement>;
};

const Select = (props: SelectProps) => {
  const { value, dailyDate, onChangeDate } = props;

  const getWeekday = (time: string) => {
    if (!time) {
      return '';
    }

    const date = new Date(time);
    
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <select
      className={cx('select-container')}
      name='weekday'
      value={value}
      onChange={onChangeDate}
    >
      {dailyDate.length === 0
        ? (
          <option value="">—</option>
        )
        : (dailyDate.map((date) => {
          return (
            <option key={date} value={date}>{getWeekday(date)}</option>
          );
        })
        )
      }
    </select>
  );
};

export default Select;
