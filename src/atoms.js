import { atom } from 'recoil';

export const menu = atom({
  key: 'menu',
  default: [],
});

export const totalAmt = atom({
  key: 'totalAmt',
  default: 0,
});

export const cart = atom({
  key: 'cart',
  default: [],
});

export const wallet = atom({
  key: 'wallet',
  default: 0,
});
