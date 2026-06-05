import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './ExtensionsList.module.scss';

import Button from '@/components/Button';
import ExtensionItem from '@/components/ExtensionItem';

import extensionsData from '@/data/extensions.json';

const cx = classNames.bind(styles);

type Extension = {
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
};

type FilterState = 'all' | 'active' | 'inactive';

const ExtensionsList = () => {
  const [dataSource, setDataSource] = useState<Extension[]>(extensionsData);
  const [filterState, setFilterState] = useState<FilterState>('all');

  const getFilteredData = (state: string) => {
    return dataSource.filter(item => {
      switch (state) {
        case 'active':
          return item?.isActive;
        case 'inactive':
          return !item?.isActive;
        case 'all':
        default:
          return true;
      }
    });
  };

  const onClickRemove = (name: string) => {
    setDataSource(prev => prev.filter(item => item.name !== name));
  };

  const onChangeActiveState = (name: string, isActive: boolean) => {
    setDataSource(prev => prev.map(item => ({
      ...item,
      isActive: item.name === name ? isActive : item.isActive
    })));
  };

  return (
    <>
      <div className={cx('extension-header-container')}>
        <h1 className={cx('title')}>Extensions List</h1>
        <div className={cx('toolbar')}>
          <Button className={cx('filter-btn', { active: filterState === 'all' })} onClick={() => setFilterState('all')}>All</Button>
          <Button className={cx('filter-btn', { active: filterState === 'active' })} onClick={() => setFilterState('active')}>Active</Button>
          <Button className={cx('filter-btn', { active: filterState === 'inactive' })} onClick={() => setFilterState('inactive')}>Inactive</Button>
        </div>
      </div>
      <div className={cx('extension-list-container')}>
        {getFilteredData(filterState).map((item) => {
          return (
            <ExtensionItem
              key={item?.name}
              logo={item?.logo}
              name={item?.name}
              description={item?.description}
              isActive={item?.isActive}
              onClickRemove={onClickRemove}
              onChangeActiveState={onChangeActiveState}
            />
          );
        })}
      </div>
    </>
  );
};

export default ExtensionsList;
