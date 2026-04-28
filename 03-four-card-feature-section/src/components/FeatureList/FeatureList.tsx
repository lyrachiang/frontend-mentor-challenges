import classNames from 'classnames/bind';

import styles from './FeatureList.module.scss';

import FeatureCard from '@/components/FeatureCard';

import SupervisorIcon from '@/assets/images/icons/icon-supervisor.svg?react';
import TeamBuilderIcon from '@/assets/images/icons/icon-team-builder.svg?react';
import KarmaIcon from '@/assets/images/icons/icon-karma.svg?react';
import CalculatorIcon from '@/assets/images/icons/icon-calculator.svg?react';

const cx = classNames.bind(styles);

const cardData = [
  {
    id: 'supervisor',
    title: 'Supervisor',
    content: 'Monitors activity to identify project roadblocks'
  },
  {
    id: 'team-builder',
    title: 'Team Builder',
    content: 'Scans our talent network to create the optimal team for your project'
  },
  {
    id: 'karma',
    title: 'Karma',
    content: 'Regularly evaluates our talent to ensure quality'
  },
  {
    id: 'calculator',
    title: 'Calculator',
    content: 'Uses data from past projects to provide better delivery estimates'
  }
] as const;

const iconMap = {
  'supervisor': <SupervisorIcon />,
  'team-builder': <TeamBuilderIcon />,
  'karma': <KarmaIcon />,
  'calculator': <CalculatorIcon />
};

const FeatureList = () => {

  return (
    <section className={cx('feature-list-container')}>
      {cardData.map((item) => {
        const icon = iconMap[item?.id];

        return (
          <div
            key={item?.id}
            className={cx('card', `${item?.id}`)}
          >
            <FeatureCard
              id={item?.id}
              title={item?.title}
              content={item?.content}
              icon={icon}
            />
          </div>
        );
      })}
    </section>
  );
};

export default FeatureList;
