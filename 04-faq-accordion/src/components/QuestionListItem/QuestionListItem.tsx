import classNames from 'classnames/bind';

import styles from './QuestionListItem.module.scss';

import PlusIcon from '@/assets/images/icons/icon-plus.svg?react';
import MinusIcon from '@/assets/images/icons/icon-minus.svg?react';

const cx = classNames.bind(styles);

type ListItemProps = {
  title: string;
  content: string;
  isActive: boolean;
  onClick: () => void;
};

const QuestionListItem = (props: ListItemProps) => {
  const { title, content, isActive, onClick } = props;

  return (
    <div className={cx('question-list-item-container')}>
      <button
        className={cx('title-btn')}
        type="button"
        onClick={onClick}
      >
        <span className={cx('title')}>{title}</span>
        <span className={cx('icon')}>
          {isActive ? <MinusIcon aria-hidden="true" /> : <PlusIcon aria-hidden="true" />}
        </span>
      </button>
      {isActive && (
        <p className={cx('content')}>{content}</p>
      )}
    </div>
  );
};

export default QuestionListItem;
