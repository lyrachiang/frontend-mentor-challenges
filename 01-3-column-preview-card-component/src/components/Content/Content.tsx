import classNames from 'classnames/bind';

import styles from './Content.module.scss';

import Card from '@/components/Card';

const cx = classNames.bind(styles);

const carData = [
  {
    id: 'sedans',
    title: 'Sedans',
    content: 'Choose a sedan for its affordability and excellent fuel economy. Ideal for cruising in the city or on your next road trip.'
  },
  {
    id: 'suvs',
    title: 'SUVs',
    content: 'Take an SUV for its spacious interior, power, and versatility. Perfect for your next family vacation and off-road adventures.'
  },
  {
    id: 'luxury',
    title: 'Luxury',
    content: 'Cruise in the best car brands without the bloated prices. Enjoy the enhanced comfort of a luxury rental and arrive in style.'
  }
] as const;

const Content = () => {
  return (
    <div className={cx('content-container')}>
      {carData.map((item) => {
        return (
          <Card
            key={item?.id}
            item={item}
          />
        );
      })}
    </div>
  );
};

export default Content;
