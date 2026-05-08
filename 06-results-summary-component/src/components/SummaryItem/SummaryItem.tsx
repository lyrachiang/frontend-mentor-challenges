import classNames from 'classnames/bind';

import styles from './SummaryItem.module.scss';

import ReactionIcon from '@/assets/images/icons/icon-reaction.svg?react';
import MemoryIcon from '@/assets/images/icons/icon-memory.svg?react';
import VerbalIcon from '@/assets/images/icons/icon-verbal.svg?react';
import VisualIcon from '@/assets/images/icons/icon-visual.svg?react';

const cx = classNames.bind(styles);

const iconMap = {
  Reaction: ReactionIcon,
  Memory: MemoryIcon,
  Verbal: VerbalIcon,
  Visual: VisualIcon
};

type SummaryItemProps = {
  title: string;
  score: number;
  total: number;
};

const SummaryItem = (props: SummaryItemProps) => {
  const { title, score, total } = props;

  const CustomIcon = iconMap[title as keyof typeof iconMap];
  const CustomStyle = `item-${title.toLowerCase()}`;
  
  return (
    <div className={cx('summary-item-container', CustomStyle)}>
      <div className={cx('item-block')}>
        <CustomIcon />
        <span className={cx('item-title')}>{title}</span>
      </div>
      <div className={cx('item-block')}>
        <span className={cx('item-score')}>{score}</span>
        <span className={cx('item-slash')}>/</span>
        <span className={cx('item-total')}>{total}</span>
      </div>
    </div>
  );
};

export default SummaryItem;
