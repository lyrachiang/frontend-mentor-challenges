import { useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './styles/TypingArea.module.scss';

import RestartIcon from '@/assets/images/icons/icon-restart.svg?react';

import Button from '@/components/Button';

const cx = classNames.bind(styles);

type TypingAreaProps = {
  status: 'idle' | 'starting';
  text: string;
  input: string;
  onStartTyping: () => void;
  onRestartTyping: () => void;
  onChangeInput: (newInput: string) => void;
};

const TypingArea = (props: TypingAreaProps) => {
  const {
    status,
    text,
    input,
    onStartTyping,
    onRestartTyping,
    onChangeInput
  } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = e.target.value;

    if (newInput.length > text.length) {
      return;
    }

    onChangeInput(newInput);
  };

  const handleRestartTyping = () => {
    if (textareaRef.current !== null) {
      textareaRef.current?.focus();
    }

    onRestartTyping();
  };

  return (
    <div className={cx('typing-area-container')}>
      {status === 'idle'
        ? (
          <>
            <div className={cx('typing-block', 'blur')}>
              {text}
            </div>
            <div className={cx('typing-mask')}>
              <Button
                icon={null}
                variant='primary'
                onClick={onStartTyping}
              >
                Start Typing Test
              </Button>
              <p className={cx('desc')} onClick={onStartTyping}>Or click the text and start typing</p>
            </div>
          </>
        )
        : (
          <div>
            <div className={cx('typing-block')}>
              <textarea
                ref={textareaRef}
                className={cx('typing-input')}
                name='typingInput'
                value={input}
                autoFocus
                onChange={handleChangeInput}
              />
              <div>{text.split('').map((char, idx) => {
                let charStyle = '';

                if (idx === input.length) {
                  charStyle = 'current';
                } else if (idx < input.length) {
                  charStyle = char === input[idx] ? 'correct' : 'incorrect';
                }

                return (
                  <span key={idx} className={cx('typing-char', charStyle)}>{char}</span>
                );
              })}</div>
            </div>
            <div className={cx('typing-toolbar')}>
              <Button
                icon={<RestartIcon />}
                variant='default'
                onClick={handleRestartTyping}
              >
                Restart Test
              </Button>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default TypingArea;
