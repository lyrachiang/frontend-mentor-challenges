import {
  createContext,
  useState,
  useContext,
  type ReactNode
} from 'react';

type Unit = 'metric' | 'imperial';

type UnitContextType = {
  unit: Unit
  switchUnit: () => void
};

const UnitContext = createContext<UnitContextType | null>(null);

export const UnitProvider = ({ children }: { children: ReactNode }) => {
  const [unit, setUnit] = useState<Unit>('metric');

  const switchUnit = () => {
    setUnit((prev) => {
      return prev === 'metric' ? 'imperial' : 'metric';
    });
  };

  return (
    <UnitContext.Provider value={{ unit, switchUnit }}>
      {children}
    </UnitContext.Provider>
  );
};

export const useUnit = () => {
  const context = useContext(UnitContext);

  if (!context) {
    throw new Error('useUnit must be used within UnitProvider');
  }

  return context;
};
