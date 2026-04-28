import classNames from 'classnames/bind';

import styles from './App.module.scss';

import Content from '@/components/Content';
import Footer from '@/components/Footer';

const cx = classNames.bind(styles);

const App = () => {
  return (
    <main className={cx('app-container')}>
      <Content />
      <Footer />
    </main>
  );
};

export default App;
