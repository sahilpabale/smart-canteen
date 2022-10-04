import React, { useState } from 'react';
import { Menu, Button } from '@chakra-ui/react';
import { MenuButton } from '@chakra-ui/react';
import { BsCart, BsCartFill } from 'react-icons/bs';
import { MenuList } from '@chakra-ui/react';
import {
  menu as menuAtom,
  totalAmt as totalAmtAtom,
  cart as cartAtom,
} from '../atoms';
import { useRecoilState } from 'recoil';
import CartMenuList from './CartMenuList';
import CheckoutList from './CheckoutList';

export default function CartMenu() {
  const [menu] = useRecoilState(menuAtom);
  const [cart] = useRecoilState(cartAtom);
  const [toCheckout, setToCheckout] = useState(false);

  const toggleToCheckout = () => {
    setToCheckout(!toCheckout);
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} variant="ghost">
        {cart.length > 0 ? <BsCartFill /> : <BsCart />}
      </MenuButton>
      <MenuList>
        {toCheckout ? (
          <CheckoutList toggleToCheckout={toggleToCheckout} />
        ) : (
          <CartMenuList menu={menu} toggleToCheckout={toggleToCheckout} />
        )}
      </MenuList>
    </Menu>
  );
}
