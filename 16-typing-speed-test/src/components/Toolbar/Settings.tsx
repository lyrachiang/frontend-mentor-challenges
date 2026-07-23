import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './styles/Settings.module.scss';

import ArrowIcon from '@/assets/images/icons/icon-down-arrow.svg?react';

import {
  type Status,
  type Difficulty,
  type Mode
} from '@/types';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

type SettingsProps = {
  status: Status;
  difficulty: Difficulty;
  mode: Mode;
  onChangeDifficulty: (difficulty: Difficulty) => void;
  onChangeMode: (mode: Mode) => void;
};

const Settings = (props: SettingsProps) => {
  const { status, difficulty, mode, onChangeDifficulty, onChangeMode } = props;

  const [showDifficultyMenu, setShowDifficultyMenu] = useState<boolean>(false);
  const [showModeMenu, setShowModeMenu] = useState<boolean>(false);

  const disabled = status === 'starting';

  const onClickDifficultySelect = (difficulty: Difficulty) => {
    onChangeDifficulty(difficulty);
    setShowDifficultyMenu(false);
  };

  const onClickModeSelect = (mode: Mode) => {
    onChangeMode(mode);
    setShowModeMenu(false);
  };

  return (
    <div className={cx('settings-container')}>
      <div className={cx('settings-option-btn')}>
        <p className={cx('settings-title')}>Difficulty:</p>
        <Button variant='option' active={difficulty === 'easy'} disabled={disabled} onClick={() => onChangeDifficulty('easy')}>Easy</Button>
        <Button variant='option' active={difficulty === 'medium'} disabled={disabled} onClick={() => onChangeDifficulty('medium')}>Medium</Button>
        <Button variant='option' active={difficulty === 'hard'} disabled={disabled} onClick={() => onChangeDifficulty('hard')}>Hard</Button>
      </div>
      <div className={cx('settings-option-btn')}>
        <p className={cx('settings-title')}>Mode:</p>
        <Button variant='option' active={mode === 'timed'} disabled={disabled} onClick={() => onChangeMode('timed')}>Timed (60s)</Button>
        <Button variant='option' active={mode === 'passage'} disabled={disabled} onClick={() => onChangeMode('passage')}>Passage</Button>
      </div>
      <div className={cx('settings-option-select')}>
        <Button
          icon={<ArrowIcon />}
          variant='select'
          disabled={disabled}
          onClick={() => {
            setShowDifficultyMenu(prev => !prev);
            setShowModeMenu(false);
          }}
        >
          {difficulty}
        </Button>
        {showDifficultyMenu && !disabled && (
          <ul className={cx('select-menu')}>
            <li
              className={cx({ active: difficulty === 'easy' })}
              onClick={() => onClickDifficultySelect('easy')}
            >
              <span className={cx('radio')}></span>
              <span>Easy</span>
            </li>
            <li
              className={cx({ active: difficulty === 'medium' })}
              onClick={() => onClickDifficultySelect('medium')}
            >
              <span className={cx('radio')}></span>
              <span>Medium</span>
            </li>
            <li
              className={cx({ active: difficulty === 'hard' })}
              onClick={() => onClickDifficultySelect('hard')}
            >
              <span className={cx('radio')}></span>
              <span>Hard</span>
            </li>
          </ul>
        )}
      </div>
      <div className={cx('settings-option-select')}>
        <Button
          icon={<ArrowIcon />}
          variant='select'
          disabled={disabled}
          onClick={() => {
            setShowModeMenu(prev => !prev);
            setShowDifficultyMenu(false);
          }}
        >
          {mode === 'timed' ? 'Timed (60s)' : mode}
        </Button>
        {showModeMenu && !disabled && (
          <ul className={cx('select-menu')}>
            <li
              className={cx({ active: mode === 'timed' })}
              onClick={() => onClickModeSelect('timed')}
            >
              <span className={cx('radio')}></span>
              <span>Timed (60s)</span>
            </li>
            <li
              className={cx({ active: mode === 'passage' })}
              onClick={() => onClickModeSelect('passage')}
            >
              <span className={cx('radio')}></span>
              <span>Passage</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Settings;
