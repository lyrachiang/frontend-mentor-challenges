import classNames from 'classnames/bind';

import styles from './App.module.scss';

import Header from '@/components/Header';
import ExtensionsList from '@/components/ExtensionsList';
import Footer from '@/components/Footer';

const cx = classNames.bind(styles);

const App = () => {
  return (
    <div className={cx('app-container')}>
      <main className={cx('main-container')}>
        <Header />
        <ExtensionsList />
      </main>
      <Footer />
    </div>
  );
};

export default App;
