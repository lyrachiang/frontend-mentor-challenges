import classNames from 'classnames/bind';

import styles from './Article.module.scss';

import StartImg from '@/assets/images/illustration-five-stars.webp';
import PlatformsImg from '@/assets/images/illustration-multiple-platforms.webp';
import ScheduleImg from '@/assets/images/illustration-consistent-schedule.webp';
import PostImg from '@/assets/images/illustration-schedule-posts.webp';
import FollowersImg from '@/assets/images/illustration-grow-followers.webp';
import GrowthImg from '@/assets/images/illustration-audience-growth.webp';
import CreatePostImg from '@/assets/images/illustration-create-post.webp';
import AIContentImg from '@/assets/images/illustration-ai-content.webp';

const cx = classNames.bind(styles);

const Article = () => {
  return (
    <div className={cx('article-container')}>
      <article className={cx('box', 'reviews')}>
        <h1>Social Media <span>10x</span> <i>Faster</i> with AI</h1>
        <img src={StartImg} width={150} height={30} alt="stars" />
        <p>Over 4,000 5-star reviews</p>
      </article>
      <article className={cx('box', 'platforms')}>
        <img src={PlatformsImg} width={315} height={60} alt="multiple platforms" />
        <h4>Manage multiple accounts and platforms.</h4>
      </article>
      <article className={cx('box', 'schedule')}>
        <h4>Maintain a consistent posting schedule.</h4>
        <img src={ScheduleImg} width={210} height={170} alt="consistent schedule" />
      </article>
      <article className={cx('box', 'post')}>
        <h4>Schedule to social media.</h4>
        <img src={PostImg} width={350} height={250} alt="schedule post" />
        <p>Optimize post timings to publish content at the perfect time for your audience.</p>
      </article>
      <article className={cx('box', 'followers')}>
        <img src={FollowersImg} width={210} height={210} alt="grow followers" />
        <h3>Grow followers with non-stop content.</h3>
      </article>
      <article className={cx('box', 'growth')}>
        <h2>{'>56%'}</h2>
        <p>faster audience growth</p>
        <img src={GrowthImg} width={180} height={70} alt="audience growth" />
      </article>
      <article className={cx('box', 'create')}>
        <h3>Create and schedule content <span>quicker.</span></h3>
        <img src={CreatePostImg} width={180} height={80} alt="create post" />
      </article>
      <article className={cx('box', 'content')}>
        <h3>Write your content using AI.</h3>
        <img src={AIContentImg} width={220} height={230} alt="ai content" />
      </article>
    </div>
  );
};

export default Article;
