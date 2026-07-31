import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './App.module.scss';

import Sider from '@/components/Sider';
import Header from '@/components/Header';
import Content from '@/components/Content';
import Footer from '@/components/Footer';

const cx = classNames.bind(styles);

const App = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showMenu]);

  const onClickCloseMenuBtn = () => {
    setShowMenu(false);
  };

  const onClickMenuBtn = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className={cx('app-container')}>
      <Sider showMenu={showMenu} onClickCloseMenuBtn={onClickCloseMenuBtn} />
      <div className={cx('main-container')}>
        <Header onClickMenuBtn={onClickMenuBtn} />
        <Content />
        <Footer />
      </div>
    </div>
  );
};

export default App;
