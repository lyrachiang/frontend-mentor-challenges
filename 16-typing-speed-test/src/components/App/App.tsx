import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './App.module.scss';

import passageData from '@/data/passage.json';
import {
  type Status,
  type Difficulty,
  type Mode,
  type ResultType
} from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toolbar } from '@/components/Toolbar';
import { TypingArea, TypingResult } from '@/components/Typing';

const cx = classNames.bind(styles);

const getRandomIntInclusive = (min: number, max: number) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

const App = () => {
  const timerRef = useRef<number | null>(null);
  const correctInputNumRef = useRef<number>(0);

  const [bestWpm, setBestWpm] = useState<number | null>(() => {
    const bestValue = localStorage.getItem('bestWpm');
    return bestValue ? Number(bestValue) : null;
  });
  const [status, setStatus] = useState<Status>('idle');
  const [difficulty, setDifficulty] = useState<Difficulty>('hard');
  const [mode, setMode] = useState<Mode>('timed');
  const [time, setTime] = useState<number>(60);
  const [typingText, setTypingText] = useState<string>(() => {
    const random = getRandomIntInclusive(1, 10);
    return passageData[difficulty][random - 1]?.text || '';
  });
  const [userInput, setUserInput] = useState<string>('');
  const [totalInputNum, setTotalInputNum] = useState<number>(0);
  const [correctInputNum, setCorrectInputNum] = useState<number>(0);
  const [resultType, setResultType] = useState<ResultType>('first');

  const getWpm = () => {
    const elapsedSeconds = getElapsedSeconds();

    if (status === 'idle' || elapsedSeconds < 10) {
      return 0;
    }

    return calculateWpm(correctInputNum, getElapsedSeconds());
  };

  const getAccuracy = () => {
    if (status === 'idle') {
      return 100;
    }

    return totalInputNum > 0 ? Math.round((correctInputNum / totalInputNum) * 100) : 100;
  };

  const getElapsedSeconds = () => {
    return mode === 'timed' ? 60 - time : time;
  };

  const calculateWpm = (correctNum: number, elapsedSeconds: number) => {
    if (elapsedSeconds <= 0) {
      return 0;
    }

    return Math.round((correctNum / 5) / (elapsedSeconds / 60));
  };

  const updatePersonalWpmResult = (finalWpm: number) => {
    setBestWpm((prev) => {
      if (prev === null) {
        setResultType('first');
        localStorage.setItem('bestWpm', String(finalWpm));
        return finalWpm;
      }

      if (finalWpm > prev) {
        setResultType('newBest');
        localStorage.setItem('bestWpm', String(finalWpm));
        return finalWpm;
      }

      setResultType('normal');
      return prev;
    });
  };

  const customStyle = status === 'finished'
    ? (resultType === 'newBest' ? 'best-result' : 'normal-result')
    : '';

  useEffect(() => {
    if (status !== 'starting') {
      return;
    }

    if (timerRef.current === null) {
      timerRef.current = setInterval(() => {
        setTime((prev) => {
          if (mode === 'timed') {
            if (prev <= 1) {
              const finalWpm = calculateWpm(correctInputNumRef.current, 60);
              updatePersonalWpmResult(finalWpm);
              setStatus('finished');

              return 0;
            }

            return prev - 1;
          }

          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [status, mode]);

  useEffect(() => {
    correctInputNumRef.current = correctInputNum;
  }, [correctInputNum]);

  const getInitTime = (mode: Mode) => {
    return mode === 'timed' ? 60 : 0;
  };

  const onChangeDifficulty = (difficulty: Difficulty) => {
    const random = getRandomIntInclusive(1, 10);
    const newTypingText = passageData[difficulty][random - 1]?.text;

    setDifficulty(difficulty);
    setTypingText(newTypingText);
  };

  const onChangeMode = (mode: Mode) => {
    setMode(mode);
    setTime(getInitTime(mode));
  };

  const onStartTyping = () => {
    setStatus('starting');
  };

  const onRestartTyping = () => {
    setUserInput('');
    setTotalInputNum(0);
    setCorrectInputNum(0);
    setTime(getInitTime(mode));
  };

  const onRetryTyping = () => {
    setStatus('idle');
    setUserInput('');
    setTotalInputNum(0);
    setCorrectInputNum(0);
    setTime(getInitTime(mode));
  };

  const onChangeInput = (newInput: string) => {
    let currentCorrectInputNum = correctInputNum;

    if (newInput.length > userInput.length) {
      const idx = newInput.length - 1;

      if (newInput[idx] === typingText[idx]) {
        setCorrectInputNum(prev => prev + 1);
        currentCorrectInputNum += 1;
      }

      setTotalInputNum(prev => prev + 1);
    }

    setUserInput(newInput);

    if (newInput.length === typingText.length) {
      const finalWpm = calculateWpm(currentCorrectInputNum, getElapsedSeconds());
      updatePersonalWpmResult(finalWpm);
      setStatus('finished');
    }
  };

  return (
    <div className={cx('app-container')}>
      <Header bestWpm={bestWpm} />
      <main className={cx('main-container', customStyle)}>
        {(status === 'idle' || status === 'starting') && (
          <>
            <Toolbar
              status={status}
              wpm={getWpm()}
              accuracy={getAccuracy()}
              time={time}
              difficulty={difficulty}
              mode={mode}
              onChangeDifficulty={onChangeDifficulty}
              onChangeMode={onChangeMode}
            />
            <TypingArea
              status={status}
              text={typingText}
              input={userInput}
              onStartTyping={onStartTyping}
              onRestartTyping={onRestartTyping}
              onChangeInput={onChangeInput}
            />
          </>
        )}
        {status === 'finished' && (
          <TypingResult
            wpm={getWpm()}
            accuracy={getAccuracy()}
            totalInputNum={totalInputNum}
            correctInputNum={correctInputNum}
            resultType={resultType}
            onRetryTyping={onRetryTyping}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
