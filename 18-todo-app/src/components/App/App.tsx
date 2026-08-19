import classNames from 'classnames/bind';

import styles from './App.module.scss';

import Header from '@/components/Header';
import Todo from '@/components/Todo';
import Footer from '@/components/Footer';

const cx = classNames.bind(styles);

const App = () => {
  return (
    <div className={cx('app-container')}>
      <main className={cx('main-container')}>
        <Header />
        <Todo />
      </main>
      <Footer />
    </div>
  );
};

export default App;
