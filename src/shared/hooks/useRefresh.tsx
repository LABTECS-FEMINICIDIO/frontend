import {createContext, ReactNode, useContext, useState} from 'react';

interface RefreshContextProps {
  count: number;
  addCount: () => void;
}

interface RefreshProviderProps {
  children: ReactNode;
}

const RefreshContext = createContext({} as RefreshContextProps);

export function RefreshProvider({children}: RefreshProviderProps) {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount(count + 1);
  };

  return (
    <RefreshContext.Provider
      value={{
        count,
        addCount,
      }}>
      {children}
    </RefreshContext.Provider>
  );
}
export function useRefresh() {
  return useContext(RefreshContext);
}
