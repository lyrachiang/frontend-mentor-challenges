import classNames from 'classnames/bind';

import styles from './App.module.scss';

import Calculator from '@/components/Calculator';
import Footer from '@/components/Footer';

import Logo from '@/assets/images/logo.svg';

const cx = classNames.bind(styles);

const App = () => {
  return (
    <div className={cx('app-container')}>
      <main className={cx('main-container')}>
        <h1 className={cx('logo-container')}>
          <img src={Logo} alt="Splitter" />
        </h1>
        <Calculator />
      </main>
      <Footer />
    </div>
  );
};

export default App;
