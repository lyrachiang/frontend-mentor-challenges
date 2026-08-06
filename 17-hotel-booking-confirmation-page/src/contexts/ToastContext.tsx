import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode
} from 'react';
import classNames from 'classnames/bind';

import styles from './styles/ToastContext.module.scss';

const cx = classNames.bind(styles);

type ToastType = 'info' | 'success' | 'error' ;

type ToastItem = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  toasts: ToastItem[];
  showToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

const DEFAULT_DURATION = 3000;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter(toast => toast.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = crypto.randomUUID();

    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, DEFAULT_DURATION);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <div
        className={cx('toast-container')}
        aria-live='polite'
        aria-atomic='false'
      >
        {toasts.map(toast => (
          <div key={toast.id} className={cx('toast', toast.type)}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return context;
};
