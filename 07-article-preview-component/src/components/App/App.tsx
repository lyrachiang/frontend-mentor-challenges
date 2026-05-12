import classNames from 'classnames/bind';

import styles from './App.module.scss';

import Article from '@/components/Article';
import Footer from '@/components/Footer';

const cx = classNames.bind(styles);

const App = () => {
  return (
    <div className={cx('app-container')}>
      <main className={cx('main-container')}>
        <Article />
      </main>
      <Footer />
    </div>
  );
};

export default App;
