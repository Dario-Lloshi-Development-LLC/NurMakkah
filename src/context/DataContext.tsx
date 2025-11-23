import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import DataService from '../services/DataService';
import { Category } from '../types';

interface AppContextType {
  categories: Category[];
  introduction: any;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [introduction, setIntroduction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      try {
        const categoriesData = DataService.getCategories();
        const introData = DataService.getIntroduction();
        setCategories(categoriesData);
        setIntroduction(introData);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <AppContext.Provider value={{ categories, introduction, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a DataProvider');
  }
  return context;
};
