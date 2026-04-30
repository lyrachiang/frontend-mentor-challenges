import classNames from 'classnames/bind';

import styles from './App.module.scss';

import QuestionList from '@/components/QuestionList';
import Footer from '@/components/Footer';

const cx = classNames.bind(styles);

const App = () => {
  return (
    <div className={cx('app-container')}>
      <main className={cx('main-container')}>
        <QuestionList />
      </main>
      <Footer />
    </div>
  );
};

export default App;
