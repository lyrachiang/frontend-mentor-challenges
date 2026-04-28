import classNames from 'classnames/bind';

import styles from './FeatureCard.module.scss';

const cx = classNames.bind(styles);

type FeatureCardProps = {
  id: string;
  title: string;
  content: string;
  icon?: React.ReactNode;
};

const FeatureCard = (props: FeatureCardProps) => {
  const { id, title, content, icon } = props;

  const customClass = `card-${id}`;

  return (
    <article className={cx('feature-card-container', customClass)}>
      <h4 className={cx('title')}>{title}</h4>
      <p className={cx('content')}>{content}</p>
      {icon && (
        <div className={cx('icon')}>{icon}</div>
      )}
    </article>
  );
};

export default FeatureCard;
