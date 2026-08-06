import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './App.module.scss';

import Sider from '@/components/Sider';
import Header from '@/components/Header';
import Content from '@/components/Content';
import Footer from '@/components/Footer';

const cx = classNames.bind(styles);

const App = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const isKeyboardModeRef = useRef<boolean>(false);
  const openedMenuByKeyboardRef = useRef<boolean>(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        isKeyboardModeRef.current = true;
      }
    };

    const handlePointerDown = () => {
      isKeyboardModeRef.current = false;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showMenu]);

  const onClickCloseMenuBtn = () => {
    setShowMenu(false);

    if (openedMenuByKeyboardRef.current) {
      menuBtnRef.current?.focus();
    }
  };

  const onClickMenuBtn = () => {
    openedMenuByKeyboardRef.current = isKeyboardModeRef.current;
    setShowMenu((prev) => !prev);
  };

  const onClickMenuItem = () => {
    setShowMenu(false);
  };

  return (
    <div className={cx('app-container')}>
      <Sider
        showMenu={showMenu}
        openedMenuByKeyboardRef={openedMenuByKeyboardRef}
        onClickCloseMenuBtn={onClickCloseMenuBtn}
        onClickMenuItem={onClickMenuItem}
      />
      <div className={cx('main-container')}>
        <Header
          showMenu={showMenu}
          menuBtnRef={menuBtnRef}
          onClickMenuBtn={onClickMenuBtn}
        />
        <Content />
        <Footer />
      </div>
    </div>
  );
};

export default App;
