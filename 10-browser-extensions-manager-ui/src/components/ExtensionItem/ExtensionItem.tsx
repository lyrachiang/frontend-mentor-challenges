import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './ExtensionItem.module.scss';

import Button from '@/components/Button';
import Switch from '@/components/Switch';

const cx = classNames.bind(styles);

type ExtensionItemProps = {
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
  onClickRemove: (name: string) => void;
  onChangeActiveState: (name: string, isActive: boolean) => void;
};

const images = import.meta.glob<{ default: string }>(
  '@/assets/images/icons/*.svg',
  { eager: true }
);

const ExtensionItem = (props: ExtensionItemProps) => {
  const {
    logo,
    name,
    description,
    isActive,
    onClickRemove,
    onChangeActiveState
  } = props;

  const [active, setActive] = useState<boolean>(isActive);

  const getImageUrl = (image: string) => {
    return images[`/src/assets/images/icons/${image}`]?.default;
  };

  const onChangeSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActive(e.target.checked);
    onChangeActiveState(name, !isActive);
  };

  return (
    <div className={cx('extension-item-container')}>
      <div className={cx('item-info')}>
        <img className={cx('item-logo')} src={getImageUrl(logo)} alt={`${name} logo`} />
        <div>
          <h2 className={cx('item-name')}>{name}</h2>
          <p className={cx('item-desc')}>{description}</p>
        </div>
      </div>
      <div className={cx('item-toolbar')}>
        <Button className={cx('remove-btn')} onClick={() => onClickRemove(name)}>Remove</Button>
        <Switch checked={active} onChange={onChangeSwitch} />
      </div>
    </div>
  );
};

export default ExtensionItem;
