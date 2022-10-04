import React from 'react';
import { useRecoilState } from 'recoil';
import { totalAmt as totalAmtAtom } from '../atoms';
import {
  Center,
  Text,
  Box,
  MenuDivider,
  HStack,
  Button,
} from '@chakra-ui/react';
import { IoBagCheckOutline } from 'react-icons/io5';

export default function CartMenuList({ menu, toggleToCheckout }) {
  const [totalAmt] = useRecoilState(totalAmtAtom);

  return (
    <>
      <Center>
        <Text p="2" fontSize="lg" fontWeight="bold">
          Your cart
        </Text>
      </Center>
      {menu.map(menu => (
        <Box key={menu.id} display={menu.count > 0 ? 'block' : 'none'}>
          <MenuDivider />
          <HStack>
            <Text p="3" fontWeight="bold" fontSize="xl">
              {menu.itemName} ({menu.count})
            </Text>
            <Text pr="3" fontWeight="bold" color="gray.400" fontSize="xl">
              ₹{menu.cost * menu.count}
            </Text>
          </HStack>
        </Box>
      ))}
      <MenuDivider />
      <Center>
        <Button
          m="3"
          w="40"
          bg="blue.500"
          _hover={{
            background: 'blue.400',
          }}
          rightIcon={<IoBagCheckOutline />}
          disabled={totalAmt === 0 ? true : false}
          onClick={toggleToCheckout}
        >
          Checkout ₹{totalAmt}
        </Button>
      </Center>
    </>
  );
}
