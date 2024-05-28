import { useState } from 'react';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import { PermissionsAndroid } from 'react-native';
import { Product, ShoppingList } from '@/services/types/classTypes';
import { string } from 'prop-types';
import { MarketResult } from '@/services/types/responseTypes';
import axios from 'axios';

const defaultUser = {
  id: '7257209c-2e9c-4a51-b007-fad256021980',
  name: 'Leo'
} as const;
export const useMarketMatchService = () => {
  const [user, setUser] = useState(defaultUser);
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [shoppingListProducts, setShoppingListProducts] = useState<Product[]>([]);
  const [location, setLocation] = useState<LocationObject>();
  const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

  async function getShoppingList() {
    return await axios.get(`${BASE_URL}/shopping-list/user/${user.id}`)
      .then((res) => {
        setShoppingLists(res.data);
      }).catch((e) => console.log(e.toJSON()));
  }

  async function getShoppingListProducts(listId: string) {
    return await axios.get(`${BASE_URL}/shopping-list/list-products/${listId}`)
      .then((res) => {
        setShoppingListProducts(res.data.map((line) => line.product));
      })
      .catch((e) => console.log(e));
  }

  async function getProductList(page: number, nameFilter: string) {
    return await axios.get(
      `${BASE_URL}/product/paginated`,
      {
        params: {
          name: nameFilter,
          page
        }
      }
    ).then((res) => {
      return res.data;
    }).catch((e) => console.log(e.toJSON()));
  }

  async function addList(name: string) {
    return await axios.post(
      `${BASE_URL}/shopping-list`,
      {
        name,
        'userId': user.id
      }
    ).then((res) => {
      setShoppingLists((shoppingLists) => {
        return [
          ...shoppingLists,
          res.data
        ];
      });
      return res.data.id;
    }).catch((e) => console.log(e));
  }

  async function addProductToList(ean: string, listId: string) {
    return await axios.post(
      `${BASE_URL}/shopping-list/add-to-list`,
      {
        listId,
        ean
      }
    ).then((res) => {
      return res.data;
    }).catch((e) => console.log(e));
  }

  async function removeFromList(ean: string, listId: string) {
    return await axios.post(
      `${BASE_URL}/shopping-list/remove-product`,
      {
        listId,
        ean
      }
    ).then((res) => {
      const newListProducts = shoppingListProducts.filter((product) => product.ean !== ean);
      setShoppingListProducts(newListProducts);
      return res.data;
    }).catch((e) => console.log(e));
  }

  async function getMarketResult(listId: string, distanceFilter: number): Promise<axios.AxiosResponse<MarketResult> | void> {
    if (!location) return;

    return await axios.post(
      `${BASE_URL}/supermarket/market-match`,
      {
        listId,
        latitude: location.coords.latitude as number,
        longitude: location.coords.longitude as number,
        distanceFilter
      }
    ).then((res) => {
      return (res.data.sort((a, b) => a.total_price - b.total_price));
    }).catch((e) => console.log(e));
  }

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permissão para usar geolocalização',
          message: 'Podemos utilizar sua localização para encontrar os mercados mais próximos a você?',
          buttonNeutral: 'Me pergunte depois',
          buttonNegative: 'Não',
          buttonPositive: 'Sim',
        },
      );
      return granted === 'granted';
    } catch (err) {
      return false;
    }
  };

  async function getLocation() {
    let allowed = await requestLocationPermission();
    if (!allowed) return;

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }

  return {
    user,
    shoppingLists,
    shoppingListProducts,

    getShoppingList,
    getProductList,
    getMarketResult,
    getShoppingListProducts,

    addProductToList,
    removeFromList,

    getLocation,
    addList
  };
};