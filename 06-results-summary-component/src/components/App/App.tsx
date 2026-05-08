import classNames from 'classnames/bind';

import styles from './App.module.scss';

import Result from '@/components/Result';
import Summary from '@/components/Summary';
import Footer from '@/components/Footer';

const cx = classNames.bind(styles);

const App = () => {
  return (
    <div className={cx('app-container')}>
      <main className={cx('main-container')}>
        <div className={cx('section-container')}>
          <Result />
          <Summary />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
