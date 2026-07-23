import classNames from 'classnames/bind';

import styles from './styles/TypingResult.module.scss';

import NewIcon from '@/assets/images/icons/icon-new-pb.svg?react';
import CompletedIcon from '@/assets/images/icons/icon-completed.svg?react';
import RestartIcon from '@/assets/images/icons/icon-restart.svg?react';

import { type ResultType } from '@/types';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

type ResultPageProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  wpm: number;
  accuracy: number;
  totalInputNum: number;
  correctInputNum: number;
  button: React.ReactNode;
};

type TypingResultProps = {
  wpm: number;
  accuracy: number;
  totalInputNum: number;
  correctInputNum: number;
  resultType: ResultType;
  onRetryTyping: () => void;
};

const ResultPage = (props: ResultPageProps) => {
  const {
    icon,
    title,
    desc,
    wpm,
    accuracy,
    totalInputNum,
    correctInputNum,
    button
  } = props;

  return (
    <section className={cx('result-page-section')}>
      {icon && icon}
      <h2 className={cx('result-title')}>{title}</h2>
      <p className={cx('result-desc')}>{desc}</p>
      <div className={cx('score-block')}>
        <div>
          <p className={cx('score-title')}>WPM:</p>
          <p className={cx('score-value')}>{wpm}</p>
        </div>
        <div>
          <p className={cx('score-title')}>Accuracy:</p>
          <p className={cx('score-value', `${accuracy === 100 ? 'correct' : 'incorrect'}`)}>{`${accuracy}%`}</p>
        </div>
        <div>
          <p className={cx('score-title')}>Characters:</p>
          <p className={cx('score-value')}>
            <span className={cx('correct')}>{correctInputNum}</span>
            <span>/</span>
            <span className={cx('incorrect')}>{totalInputNum - correctInputNum}</span>
          </p>
        </div>
      </div>
      {button && button}
    </section>
  );
};

const TypingResult = (props: TypingResultProps) => {
  const {
    wpm,
    accuracy,
    totalInputNum,
    correctInputNum,
    resultType,
    onRetryTyping
  } = props;

  return (
    <div className={cx('typing-result-container')}>
      {resultType === 'first' && (
        <ResultPage
          icon={<div className={cx('complete-icon')}><CompletedIcon /></div>}
          title='Baseline Established!'
          desc="You've set the bar. Now the real challenge begins-time to beat it."
          wpm={wpm}
          accuracy={accuracy}
          totalInputNum={totalInputNum}
          correctInputNum={correctInputNum}
          button={
            <Button
              icon={<RestartIcon />}
              variant='secondary'
              onClick={onRetryTyping}
            >
              Beat This Score
            </Button>
          }
        />
      )}
      {resultType === 'newBest' && (
        <ResultPage
          icon={<NewIcon />}
          title='High Score Smashed!'
          desc="You're getting faster. That was incredible typing."
          wpm={wpm}
          accuracy={accuracy}
          totalInputNum={totalInputNum}
          correctInputNum={correctInputNum}
          button={
            <Button
              icon={<RestartIcon />}
              variant='secondary'
              onClick={onRetryTyping}
            >
              Beat This Score
            </Button>
          }
        />
      )}
      {resultType === 'normal' && (
        <ResultPage
          icon={<div className={cx('complete-icon')}><CompletedIcon /></div>}
          title='Test Complete!'
          desc="Solid run. Keep pushing to beat your high score."
          wpm={wpm}
          accuracy={accuracy}
          totalInputNum={totalInputNum}
          correctInputNum={correctInputNum}
          button={
            <Button
              icon={<RestartIcon />}
              variant='secondary'
              onClick={onRetryTyping}
            >
              Go Again
            </Button>
          }
        />
      )}
    </div>
  );
};

export default TypingResult;
