import classNames from 'classnames/bind';

import styles from './App.module.scss';

import Form from '@/components/Form';
import Footer from '@/components/Footer';

const cx = classNames.bind(styles);

const App = () => {
  return (
    <div className={cx('app-container')}>
      <main className={cx('main-container')}>
        <section className={cx('section-container')}>
          <div>
            <div className={cx('gap')}>
              <h1 className={cx('intro-title')}>Learn to code by watching others</h1>
              <p className={cx('intro-desc')}>See how experienced developers solve problems in real-time. Watching scripted tutorials is great, but understanding how developers think is invaluable.</p>
            </div>
          </div>
          <div>
            <div className={cx('gap')}>
              <p className={cx('signup-title')}>
                <span>Try it free 7 days</span>
                then $20/mo. thereafter
              </p>
              <Form />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
