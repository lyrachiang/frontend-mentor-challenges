import {
  createContext,
  useContext,
  useState,
  type ReactNode
} from 'react';

type CartItem = {
  image: {
    desktop: string;
    tablet: string;
    mobile: string;
    thumbnail: string;
  };
  name: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  deleteItem: (name: string) => void;
  updateQuantity: (name: string, quantity: number) => void;
  clearCart: () => void;
  totalQuantity: number;
  totalPrice: string;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems((prev) => {
      const isExist = prev.find(cartItem => cartItem.name === item.name);

      if (isExist) {
        return prev.map((cartItem) => {
          if (cartItem.name === item.name) {
            return { ...item, quantity: cartItem.quantity + 1 };
          }

          return cartItem;
        });
      }

      return ([
        ...prev,
        { ...item, quantity: 1 }
      ]);
    });
  };

  const deleteItem = (name: string) => {
    setCartItems((prev) => {
      return prev.filter(item => item.name !== name);
    });
  };

  const updateQuantity = (name: string, quantity: number) => {
    setCartItems((prev) => {
      if (quantity === 0) {
        return prev.filter(item => item.name !== name);
      }

      return prev.map(item => {
        if (item.name === name) {
          return { ...item, quantity };
        }

        return item;
      });
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalQuantity = cartItems.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity;
  }, 0);

  const totalPrice = cartItems.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price * currentValue.quantity;
  }, 0).toFixed(2);

  return (
    <CartContext.Provider value={{ cartItems, addItem, deleteItem, updateQuantity, clearCart, totalQuantity, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};
