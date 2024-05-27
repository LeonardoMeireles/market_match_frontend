import { Market } from '@/services/types/classTypes';

export interface MarketResult {
  address: string,
  id: string,
  name: string,
  total_price: number,
  url: string,
  distance: number
}