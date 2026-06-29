import classNames from 'classnames/bind';

import styles from './App.module.scss';

import Notification from '@/components/Notification';
import Footer from '@/components/Footer';

const cx = classNames.bind(styles);

const App = () => {
  return (
    <div className={cx('app-container')}>
      <main className={cx('main-container')}>
        <Notification />
      </main>
      <Footer />
    </div>
  );
};

export default App;
