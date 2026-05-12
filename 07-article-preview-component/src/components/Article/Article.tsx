import classNames from 'classnames/bind';

import styles from './Article.module.scss';

import AuthorInfo from '@/components/AuthorInfo';

import DrawerImg from '@/assets/images/drawers.jpg';

const cx = classNames.bind(styles);

const Article = () => {
  return (
    <article className={cx('article-container')}>
      <img className={cx('article-img')} src={DrawerImg} alt="drawers" />
      <div className={cx('article-info')}>
        <h1 className={cx('article-title')}>Shift the overall look and feel by adding these wonderful touches to furniture in your home</h1>
        <p className={cx('article-desc')}>Ever been in a room and felt like something was missing? Perhaps it felt slightly bare and uninviting. I've got some simple tips to help you make any room feel complete.</p>
        <AuthorInfo />
      </div>
    </article>
  );
};

export default Article;
