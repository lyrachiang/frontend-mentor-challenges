import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './QuestionList.module.scss';

import QuestionListItem from '@/components/QuestionListItem/QuestionListItem';

import StarIcon from '@/assets/images/icons/icon-star.svg?react';

const cx = classNames.bind(styles);

const listData = [
  {
    id: '1',
    question: 'What is Frontend Mentor, and how will it help me?',
    answer: 'Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript. It\'s suitable for all levels and ideal for portfolio building.'
  },
  {
    id: '2',
    question: 'Is Frontend Mentor free?',
    answer: 'Yes, Frontend Mentor offers both free and premium coding challenges, with the free option providing access to a range of projects suitable for all skill levels.'
  },
  {
    id: '3',
    question: 'Can I use Frontend Mentor projects in my portfolio?',
    answer: 'Yes, you can use projects completed on Frontend Mentor in your portfolio. It\'s an excellent way to showcase your skills to potential employers!'
  },
  {
    id: '4',
    question: 'How can I get help if I\'m stuck on a challenge?',
    answer: 'The best place to get help is inside Frontend Mentor\'s Discord community. There\'s a help channel where you can ask questions and seek support from other community members.'
  }
] as const;

const QuestionList = () => {
  const [activeId, setActiveId] = useState<string | null>(listData[0]?.id ?? null);

  return (
    <section className={cx('question-list-section')}>
      <h1 className={cx('title-block')}>
        <StarIcon aria-hidden="true" />
        <span className={cx('title')}>FAQs</span>
      </h1>
      <div>
        {listData.map((item) => {
          return (
            <QuestionListItem
              key={item?.id}
              title={item?.question}
              content={item?.answer}
              isActive={activeId === item?.id}
              onClick={() => setActiveId(prev => prev === item?.id ? null : item?.id ?? null)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default QuestionList;
