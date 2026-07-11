import classNames from 'classnames/bind';

import styles from './App.module.scss';

import Balance from '@/components/Balance';
import Spending from '@/components/Spending';
import Footer from '@/components/Footer';

const cx = classNames.bind(styles);

const App = () => {
  return (
    <div className={cx('app-container')}>
      <main className={cx('main-container')}>
        <Balance />
        <Spending />
      </main>
      <Footer />
    </div>
  );
};

export default App;
