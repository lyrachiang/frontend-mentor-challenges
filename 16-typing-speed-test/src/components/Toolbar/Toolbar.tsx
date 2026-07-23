import classNames from 'classnames/bind';

import styles from './styles/Toolbar.module.scss';

import {
  type Status,
  type Difficulty,
  type Mode
} from '@/types';
import { Stats, Settings } from '@/components/Toolbar';

const cx = classNames.bind(styles);

type ToolbarProps = {
  status: Status;
  wpm: number;
  accuracy: number;
  time: number;
  difficulty: Difficulty;
  mode: Mode;
  onChangeDifficulty: (difficulty: Difficulty) => void;
  onChangeMode: (mode: Mode) => void;
};

const Toolbar = (props: ToolbarProps) => {
  const {
    status,
    wpm,
    accuracy,
    time,
    difficulty,
    mode,
    onChangeDifficulty,
    onChangeMode
  } = props;

  return (
    <div className={cx('toolbar-container')}>
      <Stats
        status={status}
        wpm={wpm}
        accuracy={accuracy}
        time={time}
        mode={mode}
      />
      <Settings
        status={status}
        difficulty={difficulty}
        mode={mode}
        onChangeDifficulty={onChangeDifficulty}
        onChangeMode={onChangeMode}
      />
    </div>
  );
};

export default Toolbar;
