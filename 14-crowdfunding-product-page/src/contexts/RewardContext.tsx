import {
  createContext,
  useContext,
  useState,
  type ReactNode
} from 'react';

import products from '@/data/products.json';

type ProductItem = {
  name: string;
  desc: string;
  pledgeAmount: number;
  stock: number;
};

type RewardContextType = {
  totalAmount: number;
  totalBackers: number;
  productItems: ProductItem[];
  updateReward: (name: string, pledgeAmount: number) => void;
  updateBackers: () => void;
};

const RewardContext = createContext<RewardContextType | null>(null);

export const RewardProvider = ({ children }: { children: ReactNode }) => {
  const [totalAmount, setTotalAmount] = useState<number>(89914);
  const [totalBackers, setTotalBackers] = useState<number>(5007);
  const [productItems, setProductItems] = useState<ProductItem[]>(products);

  const updateReward = (name: string, pledgeAmount: number) => {
    const isExists = productItems.find(item => item.name === name && item.stock > 0);

    if (!isExists) {
      return;
    }

    setProductItems((prev) => {
      return prev.map(item => {
        if (item.name === name && item.stock > 0) {
          return {
            ...item,
            stock: item.stock - 1
          };
        }

        return item;
      });
    });
  
    setTotalAmount((prev) => prev + pledgeAmount);
  };

  const updateBackers = () => {
    setTotalBackers((prev) => prev + 1);
  };

  return (
    <RewardContext.Provider value={{ totalAmount, totalBackers, productItems, updateReward, updateBackers }}>
      {children}
    </RewardContext.Provider>
  );
};

export const useReward = () => {
  const context = useContext(RewardContext);

  if (!context) {
    throw new Error('useReward must be used within RewardProvider');
  }

  return context;
};
