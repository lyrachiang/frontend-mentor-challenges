import classNames from 'classnames/bind';

import styles from './styles/ProductList.module.scss';

import { useReward } from '@/contexts/RewardContext';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

type ProductItem = {
  name: string;
  desc: string;
  pledgeAmount: number;
  stock: number;
};

type ProductCardProps = {
  dataSource: ProductItem;
  setIsOpenRewardModal: (isOpen: boolean) => void;
  onSelectProduct: (name: string) => void;
};

type ProductListProps = {
  setIsOpenRewardModal: (isOpen: boolean) => void;
  onSelectProduct: (name: string) => void;
};

const ProductCard = (props: ProductCardProps) => {
  const { dataSource, setIsOpenRewardModal, onSelectProduct } = props;

  const { name, desc, pledgeAmount, stock } = dataSource;

  const onClickRewardButton = (name: string) => {
    setIsOpenRewardModal(true);
    onSelectProduct(name);
  };

  return (
    <article className={cx('product-card-container', { 'sold-out': stock === 0 })}>
      <div>
        <h3 className={cx('product-name')}>{name}</h3>
        <span className={cx('product-pledge')}>{`Pledge $${pledgeAmount} or more`}</span>
      </div>
      <p className={cx('product-desc')}>{desc}</p>
      <div>
        <p className={cx('product-stock')}>
          <span className={cx('count')}>{stock}</span>
          <span>left</span>
        </p>
        <Button
          variant="reward"
          disabled={stock === 0}
          onClick={() => onClickRewardButton(name)}
        >
          {stock ? 'Select Reward' : 'Out of Stock'}
        </Button>
      </div>
    </article>
  );
};

const ProductList = (props: ProductListProps) => {
  const { setIsOpenRewardModal, onSelectProduct } = props;
  const { productItems } = useReward();

  return (
    <section className={cx('product-list-container')}>
      <h2 className={cx('product-list-title')}>About this project</h2>
      <p className={cx('product-list-desc')}>The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform that elevates your screen to a more comfortable viewing height. Placing your monitor at eye level has the potential to improve your posture and make you more comfortable while at work, helping you stay focused on the task at hand.</p>
      <p className={cx('product-list-desc')}>Featuring artisan craftsmanship, the simplicity of design creates extra desk space below your computer to allow notepads, pens, and USB sticks to be stored under the stand.</p>
      <div>
        {productItems.map((item) => {
          return (
            <ProductCard
              key={item.name}
              dataSource={item}
              setIsOpenRewardModal={setIsOpenRewardModal}
              onSelectProduct={onSelectProduct}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ProductList;
