export interface Product {
  ean: string,
  name: string,
  description?: string
}

export interface Market {
  id: string,
  name: string,
  address: string,
  url: string,
}

export interface ShoppingList {
  id: string,
  name: string,
}

export interface User {
  id: string,
  name: string
}