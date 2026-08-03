import classNames from 'classnames/bind';

import styles from './styles/GuestInfoCard.module.scss';

import { useToast } from '@/contexts/ToastContext';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

type CategoryType = 'arrival' | 'wifi' | 'breakfast';

type GuestInfoCardProps = {
  icon: React.ReactNode;
  id: string;
  category: CategoryType ;
  title: string;
  desc: string;
  note?: string;
};

const wifiPwd = 'soleil-2026';

const WifiInfo = () => {
  const { showToast } = useToast();

  const onClickCopyBtn = async () => {
    try {
      await navigator.clipboard.writeText(wifiPwd);
      showToast('Password copied.', 'success');
    } catch {
      showToast('Couldn\'t copy the password. Please try again.', 'error');
    }
  };

  return (
    <>
      <div className={cx('card-note')}>
        <span className={cx('title')}>Network</span>
        <span className={cx('value')}>Le Soleil · Guest</span>
      </div>
      <div className={cx('card-note')}>
        <span className={cx('title')}>Password</span>
        <div>
          <span className={cx('value')}>{wifiPwd}</span>
          <Button variant='copy' onClick={onClickCopyBtn}>
            Copy
          </Button>
        </div>
      </div>
    </>
  );
};

const GuestInfoCard = (props: GuestInfoCardProps) => {
  const {
    icon,
    id,
    category,
    title,
    desc,
    note
  } = props;

  return (
    <article className={cx('guest-info-card', `card-${category.toLowerCase()}`)}>
      <div className={cx('card-header')}>
        <div>
          <span className={cx('card-icon')}>{icon}</span>
          <span className={cx('card-category')}>{category}</span>
        </div>
        <span className={cx('card-id')}>{id}</span>
      </div>
      <p className={cx('card-title')}>{title}</p>
      <p className={cx('card-desc')}>{desc}</p>
      <div className={cx('card-content')}>
        {category !== 'wifi' && note && (<p>{note}</p>)}
        {category === 'wifi' && (<WifiInfo />)}
      </div>
    </article>
  );
};

export default GuestInfoCard;
