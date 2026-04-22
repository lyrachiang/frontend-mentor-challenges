import classNames from 'classnames/bind';

import styles from './Card.module.scss';

import Button from '@/components/Button';

const cx = classNames.bind(styles);

import SedansIcon from '@/assets/images/icons/icon-sedans.svg';
import SUVsIcon from '@/assets/images/icons/icon-suvs.svg';
import LuxuryIcon from '@/assets/images/icons/icon-luxury.svg';

const styleMap = {
  sedans: {
    icon: SedansIcon,
    style: 'card-gold'
  },
  suvs: {
    icon: SUVsIcon,
    style: 'card-cyan'
  },
  luxury: {
    icon: LuxuryIcon,
    style: 'card-green'
  }
};

type CardProps = {
  item: {
    id: keyof typeof styleMap,
    title: string,
    content: string
  };
};

const Card = (props: CardProps) => {
  const { item } = props;

  const customIcon = styleMap[item?.id]?.icon;
  const customClass = styleMap[item?.id]?.style;

  return (
    <div className={cx('card-container', customClass)}>
      <div>
        <img className={cx('card-icon')} src={customIcon} alt={item?.title} />
        <h1 className={cx('card-title')}>{item?.title}</h1>
        <p>{item?.content}</p>
      </div>
      <div>
        <Button id={item?.id} />
      </div>
    </div>
  );
};

export default Card;
