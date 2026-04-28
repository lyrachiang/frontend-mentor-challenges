import classNames from 'classnames/bind';

import styles from './FeatureIntro.module.scss';

const cx = classNames.bind(styles);

const FeatureIntro = () => {

  return (
    <section className={cx('feature-intro-container')}>
      <h2 className={cx('intro')}>Reliable, efficient delivery</h2>
      <h1 className={cx('powered-by')}>Powered by Technology</h1>
      <p className={cx('detail')}>Our Artificial Intelligence powered tools use millions of project data points to ensure that your project is successful</p>  
    </section>
  );
};

export default FeatureIntro;
