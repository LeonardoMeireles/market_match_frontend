import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
} from 'react';
import { useMarketMatchService } from '@/services/marketMatchService';
import { Product, ShoppingList, User } from '@/services/types/classTypes';
import { MarketResult } from '@/services/types/responseTypes';
import { string } from 'prop-types';

type MarketMatchContextType = {
  shoppingLists: ShoppingList[],
  user: User,
  getShoppingList: () => Promise<void>,
  shoppingListProducts: Product[],

  getProductList: (page: number, nameFilter: string) => Promise<void>;
  getShoppingListProducts: (listId: string) => Promise<Product[]>,
  getLocation: () => Promise<void>,

  addList: (name: string) => Promise<void>,
  addProductToList: (ean: string, listId: string) => Promise<void>,
  removeFromList: (ean: string, listId: string) => Promise<void>,

  getMarketResult: (listId: string, distanceFilter: number) => Promise<MarketResult[]>
};

const MarketMatchContext = createContext<MarketMatchContextType | undefined>(undefined);

function useMarketMatch(): MarketMatchContextType {
  const context = useContext(MarketMatchContext);
  if (!context) {
    throw new Error('useMarketMatch must be used within an MarketMatchProvider');
  }
  return context;
}

const MarketMatchProvider = (props: { children: ReactNode }): ReactElement => {
  return <MarketMatchContext.Provider {...props} value={{...useMarketMatchService()}}/>;
};

export { MarketMatchProvider, useMarketMatch };